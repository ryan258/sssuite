<!-- src/frontend/src/components/StoryCreator.vue -->
<template>
  <div class="story-creator">
    <h2>🖊️ Story Creator</h2>
    <form @submit.prevent="generateStory">
      <div class="form-group">
        <label for="storyIdea">Your Story Idea:</label>
        <textarea
          id="storyIdea"
          v-model="storyIdea"
          placeholder="Once upon a time..."
          rows="4"
        ></textarea>
      </div>
      <button type="submit" :disabled="isGenerating">✨ Generate Story</button>
    </form>
    <div v-if="generatedStory" class="generated-story">
      <h3>Your Generated Story:</h3>
      <p>{{ generatedStory }}</p>
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
      storyIdea: '',
      generatedStory: '',
      isGenerating: false,
      error: ''
    }
  },
  methods: {
    async generateStory() {
      this.isGenerating = true;
      this.error = '';
      this.generatedStory = '';
      try {
        console.log('Sending request to generate story...');
        const response = await axios.post('http://localhost:3000/api/stories/generate', { prompt: this.storyIdea });
        console.log('Received response:', response.data);
        this.generatedStory = response.data.story;
      } catch (error) {
        console.error('Error generating story:', error);
        this.error = `Oops! Something went wrong while creating your story. Please try again. Error: ${error.message}`;
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
      } finally {
        this.isGenerating = false;
      }
    }
  }
}
</script>

<style scoped>
.story-creator {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.generated-story {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>