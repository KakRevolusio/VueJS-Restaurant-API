<!-- src/views/FavoritesPage.vue -->
<template>
    <div class="favorites-page">
      <h1>Favorite Restaurants</h1>
      
      <div v-if="favorites.length === 0" class="no-favorites">
        <p>You haven't added any favorite restaurants yet.</p>
      </div>
      
      <div v-else class="favorites-grid">
        <RestaurantCard 
          v-for="restaurant in favorites" 
          :key="restaurant.id" 
          :restaurant="restaurant"
        />
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
  .favorites-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .no-favorites {
    text-align: center;
    color: #666;
    margin-top: 50px;
  }
  
  .favorites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  </style>