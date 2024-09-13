// src/frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import StoryDashboard from '../views/StoryDashboard.vue'
import MarketingDashboard from '../views/MarketingDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/story',
    name: 'StoryDashboard',
    component: StoryDashboard
  },
  {
    path: '/marketing',
    name: 'MarketingDashboard',
    component: MarketingDashboard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router