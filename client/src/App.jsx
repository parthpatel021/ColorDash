/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Grid Cell Component
const GridCell = (props) => {
    const { cell, isRed } = props;
    const [blinking, setBlinking] = useState(false);

    // Handling Grid Tile Click
    const handleClick = () => {
        // Score Change
        if (isRed === true) {
            props.changeScore(-10);
        }
        else if (cell === 1) {
            props.changeScore(10);
        }

        // Blinking animation for 200ms
        setBlinking(true);
        setTimeout(() => {
            setBlinking(false);
        }, "200")
    }

    return (
        <div
            className={`grid-cell ${blinking ? 'tile-blink' : ' '}`}
            style={{ backgroundColor: `${isRed ? '#FF1E00' : (cell === 1 ? 'blue' : '#191919')}` }}
            onMouseDown={handleClick}
        />
    );
}

const App = () => {
    // Game Variables
    const [highScore, setHighScore] = useState(window.localStorage.getItem("HighScore") || 0);
    const[loading, setLoading] = useState(true);
    const [redBlockIdx, setRedBlockIdx] = useState(0);
    const [gameData, setGameData] = useState({
        grid: Array.from({ length: 10 }, () => Array(10).fill(0)),
        score: 0,
        isGameRunning: false,
        animationSpeed: 0,
    });

    // Getting Grid Pattens from server
    const getGridPatten = async (req, res) => {
        const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';    
        try {
            setLoading(true);
            const { data } = await axios.get(`${apiURL}/initialGrid`);
            const gridPatten = data.grid;

            setGameData({
                grid: gridPatten,
                score: 0,
                isGameRunning: false,
                animationSpeed: 250,
            });

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        // Fetch initial data
        getGridPatten();
    }, []);

    // Game Control Functions
    const handleStartGame = () => {
        setGameData({ ...gameData, isGameRunning: true, score: 0 });
    }

    const handleStopGame = () => {
        setGameData({ ...gameData, isGameRunning: false });
        setRedBlockIdx(0);
    }

    const changeScore = (dScore) => {
        if (gameData.isGameRunning)
            setGameData({ ...gameData, score: gameData.score + dScore });

        if(gameData.score + dScore > highScore){
            setHighScore(gameData.score + dScore);
            window.localStorage.setItem("HighScore", gameData.score + dScore);
        }
    }

    const handleSpeedChange = (e) => {
        setGameData({ ...gameData, animationSpeed: 250 / (e.target.value) });
    }

    // Red Bloacks Movements
    useEffect(() => {
        let intervalId;
        const MAX_INDEX = 5; // 5 is the maximum index

        // Update redBlockIdx every second if the game is running
        if (gameData.isGameRunning) {
            intervalId = setInterval(() => {
                setRedBlockIdx((prevRedBlockIdx) => (prevRedBlockIdx + 1) % MAX_INDEX); 
            }, gameData.animationSpeed);
        }

        // Cleanup interval when the component unmounts or when the game stops
        return () => {
            clearInterval(intervalId);
        };
    }, [gameData.isGameRunning]);


    return (
        <div className="app-container">
            <h1>ColorDash <span>Challenge: Tile Tapper</span></h1>

            <div className="game-container">
                {/* Controls */}
                <div className="controls-container">
                    <div className="score-container">
                        <div className='score'>Score: {gameData.score}</div>
                        <div className='high-score'>High Score: {highScore}</div>
                    </div>
                    <div className='controls-buttons'>
                        <button onClick={handleStartGame} disabled={gameData.isGameRunning}>Start Game</button>
                        <button onClick={handleStopGame} disabled={!gameData.isGameRunning}>Stop Game</button>
                        <select disabled={gameData.isGameRunning} onChange={handleSpeedChange}>
                            <option key={1} value="1">Speed 1</option>
                            <option key={2} value="2">Speed 2</option>
                            <option key={3} value="3">Speed 3</option>
                            <option key={4} value="4">Speed 4</option>
                            <option key={5} value="5">Speed 5</option>
                        </select>
                    </div>
                </div>

                {/* 10x10 grid  */}
                <div className="grid-container">
                    {loading ? 
                    <div className='screen-loader'>
                        Loading...  
                    </div>
                    :
                    gameData.grid.map((row, rowIndex) => (
                        <>
                            {row.map((cell, colIndex) => (
                                <GridCell
                                    key={rowIndex * 10 + colIndex}
                                    cell={cell}
                                    isRed={(colIndex === redBlockIdx * 2 || colIndex === redBlockIdx * 2 + 1) ? true : false}
                                    changeScore={changeScore}
                                />
                            ))}
                        </>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default App;
