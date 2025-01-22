import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GameBoard.css'; // styling

const GameBoard = () => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch a new game when the component mounts
    axios.post('http://localhost:5000/api/games')
      .then(response => {
        setGame(response.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  const handleClick = (row, col) => {
    if (game.winner || game.board[row][col] !== "") return; // Don't make a move if the game is over or cell is occupied.

    const newPlayer = game.currentPlayer === 'X' ? 'X' : 'O';

    axios.put(`http://localhost:5000/api/games/${game._id}/move`, {
      row,
      col,
      player: newPlayer,
    })
      .then(response => {
        setGame(response.data);
      })
      .catch(error => console.error(error));
  };

  const resetGame = () => {
    axios.post('http://localhost:5000/api/games/reset', { gameId: game._id })
      .then(response => {
        setGame(response.data); // Reset game state
      })
      .catch(error => console.error(error));
  };

  const goToHistory = () => {
    // Navigate to Game History page 
    window.location.href = '/game-history';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <div className="game-info">
        <h2>Current Player: {game.currentPlayer}</h2>
        {game.winner && <h3>Winner: {game.winner}</h3>}
        {game.winner === 'draw' && <h3>It's a Draw!</h3>}
      </div>
      <div className="board">
        {game.board.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((cell, colIndex) => (
              <button
                key={colIndex}
                className={`cell ${cell}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {cell}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="game-buttons">
        <button className="reset-button" onClick={resetGame}>Reset Game</button>
        <button className="history-button" onClick={goToHistory}>Game History</button>
      </div>
    </div>
  );
};

export default GameBoard;
