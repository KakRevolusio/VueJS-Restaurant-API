<!-- src/views/HomePage.vue -->
<template>
    <div class="home-page">
      <h1>Restaurant Explorer</h1>
      
      <!-- Search Bar -->
      <div class="search-container">
        <input 
          v-model="searchQuery" 
          @input="searchRestaurants"
          placeholder="Search restaurants..."
          class="search-input"
        >
      </div>
  
      <!-- Loading State -->
      <div v-if="loading" class="loading">
        Loading restaurants...
      </div>
  
      <!-- Error State -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
  
      <!-- Restaurants List -->
      <div class="restaurants-grid" v-if="displayedRestaurants.length">
        <restaurant-card 
          v-for="restaurant in displayedRestaurants" 
          :key="restaurant.id" 
          :restaurant="restaurant"
        />
      </div>
  
      <!-- No Results -->
      <div v-else-if="!loading && searchQuery" class="no-results">
        No restaurants found matching "{{ searchQuery }}"
      </div>
    </div>
  </template>
  
  <script>
  import RestaurantCard from '@/components/RestaurantCard.vue';
  import api from '@/services/api';
  
  export default {
    name: 'HomePage',
    components: {
      RestaurantCard
    },
    data() {
      return {
        restaurants: [],
        displayedRestaurants: [],
        searchQuery: '',
        loading: true,
        error: null
      }
    },
    methods: {
      async fetchRestaurants() {
        try {
          this.loading = true;
          this.restaurants = await api.getRestaurants();
          this.displayedRestaurants = this.restaurants;
        } catch (error) {
          this.error = 'Failed to load restaurants. Please try again.';
        } finally {
          this.loading = false;
        }
      },
      async searchRestaurants() {
        if (!this.searchQuery) {
          this.displayedRestaurants = this.restaurants;
          return;
        }
  
        try {
          this.loading = true;
          this.displayedRestaurants = await api.searchRestaurants(this.searchQuery);
        } catch (error) {
          this.error = 'Search failed. Please try again.';
        } finally {
          this.loading = false;
        }
      }
    },
    mounted() {
      this.fetchRestaurants();
    }
  }
  </script>
  
  <style scoped>
  .home-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .search-container {
    margin-bottom: 20px;
  }
  
  .search-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .restaurants-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .loading, .error, .no-results {
    text-align: center;
    margin-top: 20px;
  }
  
  .error {
    color: red;
  }
  </style>