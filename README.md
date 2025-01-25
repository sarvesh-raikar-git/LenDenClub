# Tic-Tac-Toe MERN Stack Project.

## Overview
This project is a **Tic-Tac-Toe** game built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It includes user authentication, game functionality, and game history tracking. The goal was to create a functional and scalable application with a clean user interface.

---

## Features
1. **User Authentication**:
   - Registration with username, email, and password.
   - Secure password hashing using `bcrypt`.
   - JWT-based authentication for protected routes.

2. **Tic-Tac-Toe Game**:
   - Interactive gameplay with a grid layout.
   - Player turns are tracked and displayed.
   - Win/draw conditions are identified in real time.
   - A reset button to restart the game.

3. **Game History**:
   - List of all games played with details:
     - Game ID
     - Player 1
     - Player 2
     - Winner
   - Stored in MongoDB for persistence.

4. **Responsive Design**:
   - User-friendly and visually appealing layout.
   - Centered forms for login and registration.
   - Styled game board with a clean interface.

---

## Approach

### Backend
- **Authentication**:
  - Used JWT for token-based authentication.
  - Passwords are hashed using `bcrypt` before saving to the database.
  - Middleware validates JWT for secure access to protected routes.

- **Game Logic**:
  - The game state, including the grid, current player, and winner, is managed on the backend.
  - MongoDB stores game data, including game history.

### Frontend
- **React Components**:
  - Modular components for Login, Registration, Game Board, and Game History.
  - Form validation and state management using React hooks.

- **API Integration**:
  - Axios is used for HTTP requests to interact with the backend.
  - JWT token is stored in `localStorage` and sent with API requests for authenticated routes.

### Design
- Followed a component-driven approach to keep code organized and reusable.
- UI was styled with CSS for a consistent and clean design.
- Assumed all users have unique usernames for simplicity.

---

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB installed and running.

### Steps to Run Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sarvesh-raikar-git/tic-tac-toe-mern.git
   cd tic-tac-toe-mern
