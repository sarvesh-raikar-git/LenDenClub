const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = 5000;

// Replace this with your actual MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/tic-tac-toe'; 

// Middleware
app.use('/api/auth', authRoutes);
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

//routes
const gameRoutes = require('./routes/gameRoutes');
app.use('/api/games', gameRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

