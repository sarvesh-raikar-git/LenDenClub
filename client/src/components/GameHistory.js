// components/GameHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GameHistory.css'; // Add your styling here

const GameHistory = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch game history from the backend
    axios
      .get('http://localhost:5000/api/games/history') // Replace with the correct endpoint
      .then((response) => {
        setGames(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching game history:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading game history...</div>;
  }

  return (
    <div className="history-container">
      <h1 className="history-title">Game History</h1>
      {games.length === 0 ? (
        <div className="no-history">No games played yet!</div>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Winner</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game._id}>
                <td>{game._id}</td>
                <td>{game.player1}</td>
                <td>{game.player2}</td>
                <td>{game.winner || 'Draw'}</td>
                <td>{new Date(game.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GameHistory;
