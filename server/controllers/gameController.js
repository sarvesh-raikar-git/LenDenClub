const Game = require('../models/Game'); // Import the Game model

// Create a new game
exports.createGame = async (req, res) => {
  try {
    const newGame = new Game({
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      currentPlayer: 'X',
      winner: null,
      moves: 0,
    });
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ message: 'Error creating game' });
  }
};

// Make a move in the game
exports.makeMove = async (req, res) => {
  const { row, col, player } = req.body;
  const { gameId } = req.params;

  try {
    // Find the game by ID
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if the move is valid (the cell must be empty)
    if (game.board[row][col] !== '') {
      return res.status(400).json({ message: 'Cell already taken' });
    }

    // Make the move
    game.board[row][col] = player;
    game.moves += 1;

    // Switch player
    game.currentPlayer = player === 'X' ? 'O' : 'X';

    // Check for winner or draw
    const result = checkWinner(game.board);
    if (result) {
      game.winner = result === 'draw' ? 'draw' : result; // Set winner to "draw" if no winner
    }

    // Save the updated game state
    await game.save();

    res.status(200).json(game);
  } catch (error) {
    console.error('Error making move:', error);
    res.status(500).json({ message: 'Error making move' });
  }
};

// Function to check for winner or draw
const checkWinner = (board) => {
  // Check rows, columns, and diagonals for a winner
  for (let i = 0; i < 3; i++) {
    // Check rows
    if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0]; // Return the winner ('X' or 'O')
    }
    // Check columns
    if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return board[0][i];
    }
  }

  // Check diagonals
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }

  // Check for draw (if the board is full and no winner)
  const isDraw = board.every(row => row.every(cell => cell !== ''));
  if (isDraw) {
    return 'draw';
  }

  return null; // No winner yet
};
