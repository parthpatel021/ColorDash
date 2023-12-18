import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

// Use bodyParser for handling JSON requests
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Function to generate a 10x10 grid with random colors
function generateGrid() {
    const grid = [];

    for (let i = 0; i < 10; i++) {
        const row = [];
        for (let j = 0; j < 10; j++) {
            const num = Math.floor(Math.random()*6);
            row.push(num > 0 ? 0 : 1);
        }
        grid.push(row);
    }

    return grid;
}

// Example endpoint to get initial grid data
app.get('/initialGrid', (req, res) => {
    const initialGrid = generateGrid();
    res.send({ grid: initialGrid });
});

// Your other endpoints and logic...

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
