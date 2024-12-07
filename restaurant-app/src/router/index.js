import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import DetailPage from '../views/DetailPage.vue';
import FavoritesPage from '../views/FavoritesPage.vue';

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
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;