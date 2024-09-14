// src/backend/services/AIModelInterface.ts

import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export interface AIModelResponse {
  text: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface AIModelParams {
  prompt: string;
  max_tokens?: number;
  temperature?: number;
  // Add other common parameters as needed
}

export abstract class AIModelInterface {
  protected apiKey: string;
  protected baseUrl: string;
  protected modelName: string;

  constructor(apiKey: string, baseUrl: string, modelName: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.modelName = modelName;
  }

  abstract generateText(params: AIModelParams): Promise<AIModelResponse>;

  protected async makeRequest(endpoint: string, data: any): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}${endpoint}`, data, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error making request to AI model:', error);
      throw new Error('Failed to generate text from AI model');
    }
  }
}

export class OllamaModel extends AIModelInterface {
  constructor() {
    super('', process.env.API_URL!, process.env.MODEL_NAME!);
  }

  async generateText(params: AIModelParams): Promise<AIModelResponse> {
    const ollamaParams = {
      model: this.modelName,
      prompt: params.prompt,
      options: {
        num_predict: params.max_tokens,
        temperature: params.temperature,
      }
    };
    try {
      console.log('Sending request to Ollama API:', JSON.stringify(ollamaParams));
      const response = await axios.post(this.baseUrl, ollamaParams, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'
      });
      
      console.log('Received raw response from Ollama API:', response.data);
      
      const parsedResponse = this.parseStreamingResponse(response.data);
      console.log('Parsed response:', parsedResponse);
      
      return this.formatResponse(parsedResponse);
    } catch (error) {
      console.error('Error making request to Ollama API:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data);
      }
      throw new Error('Failed to generate text from Ollama API');
    }
  }

  private parseStreamingResponse(rawResponse: string): any {
    const lines = rawResponse.split('\n').filter(line => line.trim() !== '');
    let fullText = '';
    let lastObject: any = {};

    lines.forEach(line => {
      try {
        const jsonObject = JSON.parse(line);
        if (jsonObject.response) {
          fullText += jsonObject.response;
        }
        lastObject = jsonObject;
      } catch (error) {
        console.error('Error parsing JSON line:', line);
      }
    });

    return { ...lastObject, fullResponse: fullText };
  }

  private formatResponse(response: any): AIModelResponse {
    return {
      text: response.fullResponse || '',
      usage: {
        prompt_tokens: response.prompt_eval_count || 0,
        completion_tokens: response.eval_count || 0,
        total_tokens: (response.prompt_eval_count || 0) + (response.eval_count || 0)
      }
    };
  }
}


export class OpenAIModel extends AIModelInterface {
  constructor() {
    super(process.env.OPENAI_API_KEY!, 'https://api.openai.com/v1', process.env.OPENAI_MODEL_NAME!);
  }

  async generateText(params: AIModelParams): Promise<AIModelResponse> {
    const openAIParams = {
      model: this.modelName,
      messages: [{ role: "user", content: params.prompt }],
      max_tokens: params.max_tokens,
      temperature: params.temperature,
    };
    const response = await this.makeRequest('/chat/completions', openAIParams);
    return this.formatResponse(response);
  }

  private formatResponse(response: any): AIModelResponse {
    return {
      text: response.choices[0].message.content,
      usage: response.usage
    };
  }
}

export class AnthropicModel extends AIModelInterface {
  constructor() {
    super(process.env.ANTHROPIC_API_KEY!, 'https://api.anthropic.com/v1', process.env.ANTHROPIC_MODEL_NAME!);
  }

  async generateText(params: AIModelParams): Promise<AIModelResponse> {
    const anthropicParams = {
      model: this.modelName,
      prompt: params.prompt,
      max_tokens_to_sample: params.max_tokens,
      temperature: params.temperature,
    };
    const response = await this.makeRequest('/complete', anthropicParams);
    return this.formatResponse(response);
  }

  private formatResponse(response: any): AIModelResponse {
    return {
      text: response.completion,
      usage: {
        prompt_tokens: response.prompt_tokens,
        completion_tokens: response.completion_tokens,
        total_tokens: response.total_tokens
      }
    };
  }
}