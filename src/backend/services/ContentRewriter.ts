// src/backend/services/ContentRewriter.ts

import { AIModelFactory, AIModelType } from './AIModelFactory';
import { AIModelParams } from './AIModelInterface';

export class ContentRewriter {
  private aiModel;

  constructor(modelType: AIModelType = AIModelType.OLLAMA) {
    this.aiModel = AIModelFactory.createModel(modelType);
  }

  async rewriteContent(content: string, suggestions: string[]): Promise<string> {
    const params: AIModelParams = {
      prompt: `Rewrite the following content, incorporating these improvement suggestions:

Content:
${content}

Improvement Suggestions:
${suggestions.map(suggestion => `- ${suggestion}`).join('\n')}

Rewritten Content:`,
      max_tokens: 1000,
      temperature: 0.7
    };

    try {
      const response = await this.aiModel.generateText(params);
      return response.text.trim();
    } catch (error) {
      console.error('Error in ContentRewriter:', error);
      throw new Error('Failed to rewrite content');
    }
  }
}