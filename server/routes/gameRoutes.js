const express = require('express');
const gameController = require('../controllers/gameController');
const router = express.Router();

// Create a new game
router.post('/', gameController.createGame);

// Make a move in the game
router.put('/:id/move', gameController.makeMove);

module.exports = router;
