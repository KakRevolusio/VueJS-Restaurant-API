<!-- src/views/HomePage.vue -->
<template>
    <div class="container my-5">
    <h1 class="mb-4 text-center">Restaurant Explorer</h1>

    <!-- Search Bar -->
    <div class="mb-4">
      <input 
        v-model="searchQuery" 
        @input="searchRestaurants" 
        placeholder="Search restaurants..." 
        class="form-control"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center">Loading restaurants...</div>

    <!-- Error State -->
    <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>

    <!-- Restaurants List -->
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" v-if="displayedRestaurants.length">
      <restaurant-card v-for="restaurant in displayedRestaurants" :key="restaurant.id" :restaurant="restaurant" />
    </div>

    <!-- No Results -->
    <div v-else-if="!loading && searchQuery" class="text-center text-muted">
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
  
  </style>