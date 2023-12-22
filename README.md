# ColorDash Challenge

ColorDash is a simple and interactive tile-tapping game built using React.js and Node.js. The goal is to replicate a 10x10 grid with colored tiles, where users can click on blue tiles to earn points and avoid clicking on red tiles, which deduct points.

## Features

- **Start and Stop Controls:** Initiate and pause the game using the "Start Game" and "Stop Game" buttons.
- **Speed Control:** Adjust the speed of the animation with a dropdown ranging from 1 to 5.
- **Score Display:** Keep track of the user's score, with +10 for clicking on blue tiles and -10 for red tiles.
- **Blinking Animation:** Tiles blink three times when clicked, providing visual feedback.
- **Backend Integration:** Server-side logic in Node.js generates initial grid patterns served to the frontend.

## Getting Started

### Prerequisites

- Node.js and npm installed locally.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ColorDash.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ColorDash
   ```
3. Install dependencies for both the frontend and backend:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
### Usage
1. Start the Node.js server:
   ```bash
   cd server && npm start
   ```
2. Start the React.js app in another terminal window:
   ```bash
   cd client && npm start
   ```
3 Open your browser and navigate to http://localhost:3000 to play ColorDash.

### Configuration
* The backend server runs on http://localhost:8080 by default. Adjust the port in `server.js` if needed.
* The frontend communicates with the backend via the `REACT_APP_API_URL` environment variable. Ensure it is correctly configured in the `.env` file in the `client` directory.

### Acknowledgments
* Inspired by the ColorDash challenge.
* Thanks to the React.js and Node.js communities.
