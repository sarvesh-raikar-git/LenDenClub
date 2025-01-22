// models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  player1: {
    type: String,
    required: true,
  },
  player2: {
    type: String,
    required: true,
  },
  winner: {
    type: String, // 'X', 'O', or 'draw'
    default: 'draw',
  },
  board: {
    type: [[String]],
    default: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
  },
  currentPlayer: {
    type: String,
    default: 'X',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Game', gameSchema);
