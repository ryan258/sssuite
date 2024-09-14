// src/backend/server.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import storyRoutes from './routes/storyRoutes';

// Import routes (to be created)
// import storyRoutes from './routes/storyRoutes';
// import marketingRoutes from './routes/marketingRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:8080', // Replace with your frontend URL
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
// app.use('/api/stories', storyRoutes);
// app.use('/api/marketing', marketingRoutes);

// Database connection (uncomment when ready to connect to MongoDB)
// mongoose.connect(process.env.MONGODB_URI as string)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/stories', storyRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to AI Story Creator and Marketing Helper API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});