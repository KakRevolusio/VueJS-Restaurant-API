import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import DetailPage from '../views/DetailPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/restaurant/:id',
    name: 'detail',
    component: DetailPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;