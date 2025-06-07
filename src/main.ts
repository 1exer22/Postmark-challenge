import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import BeatPage from './pages/BeatPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/beat/:id', component: BeatPage },
  { path: '/:pathMatch(.*)*', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App)
  .use(router)
  .mount('#app')