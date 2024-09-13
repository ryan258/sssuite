// src/backend/server.js

const express = require('express');
const cors = require('cors');
const storyRoutes = require('./api/storyRoutes');
const marketingRoutes = require('./api/marketingRoutes');
const userRoutes = require('./api/userRoutes');
const db = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stories', storyRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/users', userRoutes);

// Database connection
db.connect();

// TODO: Add error handling middleware

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;