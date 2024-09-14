// src/backend/services/AIModelFactory.ts

import { AIModelInterface, OllamaModel, OpenAIModel, AnthropicModel } from './AIModelInterface';

export enum AIModelType {
  OLLAMA = 'ollama',
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
}

export class AIModelFactory {
  static createModel(modelType: AIModelType): AIModelInterface {
    switch (modelType) {
      case AIModelType.OLLAMA:
        return new OllamaModel();
      case AIModelType.OPENAI:
        return new OpenAIModel();
      case AIModelType.ANTHROPIC:
        return new AnthropicModel();
      default:
        throw new Error(`Unsupported AI model type: ${modelType}`);
    }
  }
}