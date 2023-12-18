/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

const API_URL = 'http://localhost:8080'; // Update with your server endpoint

const App = () => {
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

    const getGridPatten = async (req,res) => {
        try {
            const {data} = await axios.get(`${API_URL}/initialGrid`);
            const gridPatten= data.grid;
            console.log(gridPatten);
            setGameData({grid: gridPatten, 
                score: 0,
                isGameRunning: false,
                animationSpeed: 250,});
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // Fetch initial data
        getGridPatten();
    }, []);



    return (
        <div className="app-container">
            <h1>ColorDash Challenge: Tile Tapper</h1>
            
            <div className="game-container">
                <div className="controls-container">
                    <div className="score-container">Score: {gameData.score}</div>
                    <button disabled={gameData.isGameRunning}>Start Game</button>
                    <button disabled={!gameData.isGameRunning}>Stop Game</button>
                    <select disabled={gameData.isGameRunning}>
                        <option value="1">Speed 1</option>
                        <option value="2">Speed 2</option>
                        <option value="3">Speed 3</option>
                        <option value="4">Speed 4</option>
                        <option value="5">Speed 5</option>
                    </select>
                </div>
                <div className="grid-container">
                    {/* Render your 10x10 grid here and handle tile clicks */}
                    {gameData.grid.map((row, rowIndex) => (
                        <>
                            {row.map((cell, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={`grid-cell ${cell === 1 ? 'blue' : 'red'}`}
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
