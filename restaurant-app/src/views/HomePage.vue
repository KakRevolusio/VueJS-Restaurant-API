<!-- src/views/HomePage.vue -->
<template>
  <div class="hero-section">
          <div class="row align-items-center mb-0">
              <div class="col-md-6 ">
                  <h1>Restaurant Explorer</h1>
                  <p>Temukan restoran terbaik di sekitar Anda dengan mudah.</p>
                  <a href="#search" class="btn btn-light">Cari Sekarang</a>
              </div>
              <div class="col-md-6 text-center">
                  <img src="@/assets/Restaurant Explorer.png" alt="Logo" class="img-fluid" />
              </div>
          </div>
      </div>

  <div class="container my-5">
      <!-- Hero Section -->
      
      <h1 class="mb-4 text-center">Restaurant Explorer</h1>

      <!-- Search Bar -->
      <div class="mb-4" id="search">
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
  .hero-section {
      background-image: url('@/assets/hero.jpg');
      background-size: cover;
      background-position: center;
      position: relative;
      color: white;
      padding: 20px;
  }
  
  .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5); /* Filter gelap */
      z-index: 1;
  }
  
  .hero-section .row {
      position: relative;
      z-index: 2; /* Pastikan konten berada di atas filter */
  }
  </style>