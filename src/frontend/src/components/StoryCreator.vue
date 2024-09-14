<!-- src/frontend/src/components/StoryCreator.vue -->
<template>
  <div class="story-creator">
    <h2>🖊️ Story Creator</h2>
    <div v-if="step === 'ideaInput'">
      <form @submit.prevent="generateOptions">
        <div class="form-group">
          <label for="storyIdea">Your Story Idea:</label>
          <textarea
            id="storyIdea"
            v-model="storyIdea"
            placeholder="Once upon a time..."
            rows="4"
          ></textarea>
        </div>
        <button type="submit" :disabled="isGenerating">✨ Generate Options</button>
      </form>
    </div>

    <div v-if="step === 'optionSelection'">
      <h3>Choose Your Adventure:</h3>
      <div v-if="presentationOptions.length === 0">
        <p>No options generated. Please try again.</p>
      </div>
      <div v-else v-for="(option, index) in presentationOptions" :key="index" class="option">
        <h4>Option {{ index + 1 }}: {{ option.title }}</h4>
        <p>{{ option.description }}</p>
        <button @click="selectOption(index)">Choose This Option</button>
      </div>
    </div>

    <div v-if="step === 'contentCreation'">
      <h3>Create Your Content: {{ selectedOption.title }}</h3>
      <p>{{ selectedOption.description }}</p>
      <form @submit.prevent="createContent">
        <div class="form-group">
          <label for="storyContent">Your Story:</label>
          <textarea
            id="storyContent"
            v-model="generatedContent"
            rows="10"
            cols="50"
            placeholder="Start writing your story here..."
          ></textarea>
        </div>
        <button type="submit" :disabled="isCreating">Create Story</button>
      </form>
    </div>

    <div v-if="step === 'contentEvaluation'" class="content-evaluation-container">
      <div class="story-content">
        <h3>Your Story:</h3>
        <div class="story-text">{{ generatedContent }}</div>
      </div>
      <div class="evaluation-results">
        <h3>Content Evaluation:</h3>
        <div class="evaluation-score">
          <span class="score-label">Score:</span>
          <span class="score-value">{{ contentScore }}/10</span>
        </div>
        <div v-if="contentScore < 9" class="improvement-suggestions">
          <h4>Suggestions for improvement:</h4>
          <div v-html="formattedSuggestions"></div>
        </div>
        <div class="evaluation-actions">
          <button v-if="contentScore < 9" @click="rewriteContent" class="rewrite-btn">Rewrite Content</button>
          <button v-else @click="finalizeContent" class="finalize-btn">Finalize Content</button>
        </div>
      </div>
    </div>

    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StoryCreator',
  data() {
    return {
      step: 'ideaInput',
      storyIdea: '',
      presentationOptions: [],
      selectedOption: null,
      generatedContent: '',
      contentScore: 0,
      improvementSuggestions: [],
      isGenerating: false,
      isCreating: false,
      error: ''
    }
  },
  methods: {
    async generateOptions() {
      this.isGenerating = true;
      this.error = '';
      try {
        console.log('Sending request to generate options...');
        const response = await axios.post('http://localhost:3000/api/stories/generate-options', { prompt: this.storyIdea });
        console.log('Received response:', response.data);
        this.presentationOptions = response.data.options;
        this.step = 'optionSelection';
      } catch (error) {
        console.error('Error generating options:', error);
        this.error = `Oops! Something went wrong. Please try again. Error: ${error.message}`;
      } finally {
        this.isGenerating = false;
      }
    },
    selectOption(index) {
      this.selectedOption = this.presentationOptions[index];
      this.step = 'contentCreation';
    },
    async createContent() {
      this.isCreating = true;
      this.error = '';
      try {
        const response = await axios.post('http://localhost:3000/api/stories/create', {
          option: this.selectedOption,
          content: this.generatedContent
        });
        this.generatedContent = response.data.story;
        this.evaluateContent();
      } catch (error) {
        console.error('Error creating content:', error);
        this.error = `Oops! Something went wrong. Please try again. Error: ${error.message}`;
      } finally {
        this.isCreating = false;
      }
    },
    async evaluateContent() {
      try {
        const response = await axios.post('http://localhost:3000/api/stories/evaluate', { content: this.generatedContent });
        this.contentScore = response.data.score;
        this.improvementSuggestions = response.data.suggestions;
        this.step = 'contentEvaluation';
      } catch (error) {
        console.error('Error evaluating content:', error);
        this.error = `Oops! Something went wrong. Please try again. Error: ${error.message}`;
      }
    },
    async rewriteContent() {
      try {
        const response = await axios.post('http://localhost:3000/api/stories/rewrite', { 
          content: this.generatedContent,
          suggestions: this.improvementSuggestions
        });
        this.generatedContent = response.data.rewrittenContent;
        this.evaluateContent();
      } catch (error) {
        console.error('Error rewriting content:', error);
        this.error = `Oops! Something went wrong. Please try again. Error: ${error.message}`;
      }
    },
    finalizeContent() {
      // Implement logic to move to marketing analysis
      console.log('Content finalized. Moving to marketing analysis...');
    }
  },
  computed: {
    formattedSuggestions() {
      return this.improvementSuggestions.map(suggestion => {
        // Replace numbered suggestions with formatted HTML
        return suggestion.replace(/(\d+\.\s*\*\*)(.+?)(\*\*:)/, (match, p1, p2, p3) => {
          return `<strong class="suggestion-number">${p1}</strong><strong class="suggestion-title">${p2}</strong>${p3}`;
        });
      }).join('<br><br>');
    }
  },
}
</script>

<style scoped>
.story-creator {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 5px;
}
textarea {
  width: 100%;
  padding: 10px;
}
button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:disabled {
  background-color: #cccccc;
}
.content-evaluation {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}
.content-evaluation-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.story-content, .evaluation-results {
  flex: 1;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
}

.story-text {
  white-space: pre-wrap;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
  line-height: 1.6;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.evaluation-score {
  font-size: 1.2em;
  margin-bottom: 15px;
}

.score-label {
  font-weight: bold;
}

.score-value {
  color: #4CAF50;
  font-weight: bold;
  margin-left: 10px;
}

.improvement-suggestions {
  margin-top: 15px;
}

.improvement-suggestions h4 {
  margin-bottom: 10px;
}

.evaluation-actions {
  margin-top: 20px;
}

.rewrite-btn, .finalize-btn {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.rewrite-btn {
  background-color: #2196F3;
  color: white;
}

.rewrite-btn:hover {
  background-color: #1976D2;
}

.finalize-btn {
  background-color: #4CAF50;
  color: white;
}

.finalize-btn:hover {
  background-color: #45a049;
}
</style>

<style>
.suggestion-number {
  color: #2196F3;
  margin-right: 5px;
}

.suggestion-title {
  color: #333;
  text-decoration: underline;
}
</style>