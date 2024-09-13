// src/backend/config/database.js

const mongoose = require('mongoose');

const connect = async () => {
  try {
    // TODO: Add database connection string
    await mongoose.connect('mongodb://localhost:27017/sssuite', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { connect };