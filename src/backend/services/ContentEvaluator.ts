// src/backend/services/ContentEvaluator.ts

import { AIModelFactory, AIModelType } from './AIModelFactory';
import { AIModelParams } from './AIModelInterface';

export class ContentEvaluator {
  private aiModel;

  constructor(modelType: AIModelType = AIModelType.OLLAMA) {
    this.aiModel = AIModelFactory.createModel(modelType);
  }

  async evaluateContent(content: string): Promise<{ score: number, suggestions: string[] }> {
    const params: AIModelParams = {
      prompt: `Evaluate the following content and provide a score from 1 to 10, along with suggestions for improvement:

${content}

Response format:
Score: [1-10]
Suggestions:
- Suggestion 1
- Suggestion 2
- Suggestion 3`,
      max_tokens: 500,
      temperature: 0.7
    };

    try {
      const response = await this.aiModel.generateText(params);
      
      // Parse the response
      const lines = response.text.split('\n');
      const score = parseInt(lines[0].split(':')[1].trim());
      const suggestions = lines.slice(2).map(line => line.trim().replace(/^- /, ''));

      return { score, suggestions };
    } catch (error) {
      console.error('Error in ContentEvaluator:', error);
      throw new Error('Failed to evaluate content');
    }
  }
}