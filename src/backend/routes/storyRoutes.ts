// src/backend/routes/storyRoutes.ts

import express from 'express';
import { StoryGenerator } from '../services/StoryGenerator';
import { ContentEvaluator } from '../services/ContentEvaluator';
import { ContentRewriter } from '../services/ContentRewriter';
import { AIModelType } from '../services/AIModelFactory';

const router = express.Router();
const storyGenerator = new StoryGenerator(AIModelType.OLLAMA);
const contentEvaluator = new ContentEvaluator(AIModelType.OLLAMA);
const contentRewriter = new ContentRewriter(AIModelType.OLLAMA);

router.post('/generate-options', async (req, res) => {
  try {
    console.log('Received generate options request:', req.body);
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const options = await storyGenerator.generateOptions(prompt);
    console.log('Generated options:', options);
    res.json({ options });
  } catch (error) {
    console.error('Error in generate options route:', error);
    res.status(500).json({ 
      error: 'Failed to generate options', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.post('/create', async (req, res) => {
  try {
    console.log('Received create content request:', req.body);
    const { option, content } = req.body;
    if (!option || !content) {
      return res.status(400).json({ error: 'Option and content are required' });
    }
    const story = await storyGenerator.createStory(option, content);
    console.log('Generated story:', story);
    res.json({ story });
  } catch (error) {
    console.error('Error in create content route:', error);
    res.status(500).json({ 
      error: 'Failed to create content', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.post('/evaluate', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    const evaluation = await contentEvaluator.evaluateContent(content);
    res.json(evaluation);
  } catch (error) {
    console.error('Error in evaluate content route:', error);
    res.status(500).json({ 
      error: 'Failed to evaluate content', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.post('/rewrite', async (req, res) => {
  try {
    const { content, suggestions } = req.body;
    if (!content || !suggestions) {
      return res.status(400).json({ error: 'Content and suggestions are required' });
    }
    const rewrittenContent = await contentRewriter.rewriteContent(content, suggestions);
    res.json({ rewrittenContent });
  } catch (error) {
    console.error('Error in rewrite content route:', error);
    res.status(500).json({ 
      error: 'Failed to rewrite content', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;