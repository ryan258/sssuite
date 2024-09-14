// src/backend/routes/storyRoutes.ts

import express from 'express';
import { StoryGenerator } from '../services/StoryGenerator';
import { AIModelType } from '../services/AIModelFactory';

const router = express.Router();
const storyGenerator = new StoryGenerator(AIModelType.OLLAMA);

router.post('/generate', async (req, res) => {
  try {
    console.log('Received story generation request:', req.body);
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const story = await storyGenerator.generateStory(prompt);
    console.log('Generated story:', story);
    res.json({ story });
  } catch (error: unknown) {
    console.error('Error in story generation route:', error);
    if (error instanceof Error) {
      res.status(500).json({ 
        error: 'Failed to generate story', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to generate story', 
        details: 'An unknown error occurred' 
      });
    }
  }
});

export default router;