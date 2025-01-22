import React from 'react';
import './App.css';
import GameBoard from './components/GameBoard'; // Correct import for Login component

function App() {
  return (
    <div className="App">
      <GameBoard /> {/* Now this will render the Login component */}
    </div>
  );
}

export default App;
