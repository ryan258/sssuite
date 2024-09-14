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
      <button type="submit">✨ Generate Story</button>
    </form>
    <div v-if="generatedStory" class="generated-story">
      <h3>Your Generated Story:</h3>
      <p>{{ generatedStory }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoryCreator',
  data() {
    return {
      storyIdea: '',
      generatedStory: ''
    }
  },
  methods: {
    async generateStory() {
      // TODO: Implement API call to backend for story generation
      // For now, we'll use a placeholder response
      this.generatedStory = `Here's a story based on your idea: "${this.storyIdea}".\n\nOnce upon a time, in a magical forest...`;
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
</style>