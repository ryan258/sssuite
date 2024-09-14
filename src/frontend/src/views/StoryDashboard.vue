<!-- src/frontend/src/views/StoryDashboard.vue -->
<template>
  <div class="story-dashboard">
    <h2>Story Dashboard</h2>
    <p>Here you can create and manage your stories! 📚✍️</p>
    <StoryCreator />
  </div>
</template>

<script>
import StoryCreator from '@/components/StoryCreator.vue'
export default {
  name: 'StoryDashboard',
  components: {
    StoryCreator
  }
}
</script>