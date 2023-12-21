import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

const GridCell = (props) => {
    const { cell, isRed } = props;
    const [blinking, setBlinking] = useState(false);

    const handleClick = () => {
        if (isRed === true) {
            props.changeScore(-10);
        }
        else if (cell === 1) {
            props.changeScore(10);
        }
        setBlinking(true);
        setTimeout(() => {
            setBlinking(false);
        }, "200")
    }

    return (
        <div
            className={`grid-cell ${blinking ? 'blink' : ' '}`}
            style={{ backgroundColor: `${isRed ? 'red' : (cell === 1 ? 'blue' : 'black')}` }}
            onMouseDown={handleClick}
        />
    );
}

const App = () => {
    const [redBlockIdx, setRedBlockIdx] = useState(0);
    const [gameData, setGameData] = useState({
        grid: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        score: 0,
        isGameRunning: false,
        animationSpeed: 250,
    });

    const getGridPatten = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/initialGrid`);
            const gridPatten = data.grid;
            
            setGameData({
                grid: gridPatten,
                score: 0,
                isGameRunning: false,
                animationSpeed: 250,
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // Fetch initial data
        getGridPatten();   
    }, []);

    const handleStartGame = () => {
        setGameData({ ...gameData, isGameRunning: true });
    }

    const handleStopGame = () => {
        setGameData({ ...gameData, isGameRunning: false });
    }

    const changeScore = (dScore) => {
        setGameData({ ...gameData, score: gameData.score + dScore });
    }


    return (
        <div className="app-container">
            <h1>ColorDash Challenge: Tile Tapper</h1>

            <div className="game-container">
                <div className="controls-container">
                    <div className="score-container">Score: {gameData.score}</div>
                    <button onClick={handleStartGame} disabled={gameData.isGameRunning}>Start Game</button>
                    <button onClick={handleStopGame} disabled={!gameData.isGameRunning}>Stop Game</button>
                    <select disabled={gameData.isGameRunning}>
                        <option key={1} value="1">Speed 1</option>
                        <option key={2} value="2">Speed 2</option>
                        <option key={3} value="3">Speed 3</option>
                        <option key={4} value="4">Speed 4</option>
                        <option key={5} value="5">Speed 5</option>
                    </select>
                </div>
                <div className="grid-container">
                    {/* 10x10 grid  */}
                    {gameData.grid.map((row, rowIndex) => (
                        <>
                            {row.map((cell, colIndex) => (
                                <GridCell
                                    key={rowIndex*10+colIndex}
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
