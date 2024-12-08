<!-- src/views/FavoritesPage.vue -->
<template>
   <div class="container my-5">
    <h1 class="mb-4">Favorite Restaurants</h1>
    
    <div v-if="favorites.length === 0" class="alert alert-info text-center">
      <p>You haven't added any favorite restaurants yet.</p>
      <router-link to="/" class="btn btn-primary">Browse Restaurants</router-link>
    </div>

    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <RestaurantCard v-for="restaurant in favorites" :key="restaurant.id" :restaurant="restaurant" />
    </div>
  </div>
  </template>
  
  <script>
  import api from '@/services/api';
  import RestaurantCard from '@/components/RestaurantCard.vue';
  
  export default {
    name: 'FavoritesPage',
    components: {
      RestaurantCard
    },
    data() {
      return {
        favorites: []
      }
    },
    mounted() {
      this.loadFavorites();
    },
    methods: {
      loadFavorites() {
        this.favorites = api.getFavorites();
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>