<!-- src/views/DetailPage.vue -->
<template>
  <div v-if="loading" class="text-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    Loading restaurant details...
  </div>

  <div v-else-if="restaurant" class="container my-5">
    <div class="card mb-4 shadow-sm">
      <img :src="imageUrl" :alt="restaurant.name" class="card-img-top" style="height: 300px; object-fit: cover;">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h3 class="card-title">{{ restaurant.name }}</h3>
          <button @click="toggleFavorite" class="btn btn-outline-danger">
            {{ isFavorite ? '❤️' : '🤍' }}
          </button>
        </div>
        <p class="text-muted">{{ restaurant.city }} | {{ restaurant.address }}</p>
        <p class="text-warning">⭐ {{ restaurant.rating }}/5</p>
        <p>{{ restaurant.description }}</p>
      </div>
    </div>

    <!-- Menu Section -->
    <div class="row">
      <div class="col-md-6">
        <h5>Foods</h5>
        <ul>
          <li v-for="food in restaurant.menus.foods" :key="food.name">{{ food.name }}</li>
        </ul>
      </div>
      <div class="col-md-6">
        <h5>Drinks</h5>
        <ul>
          <li v-for="drink in restaurant.menus.drinks" :key="drink.name">{{ drink.name }}</li>
        </ul>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="mt-4">
      <h5>Customer Reviews</h5>
      <div class="mb-4">
        <input v-model="newReview.name" placeholder="Your Name" class="form-control mb-2">
        <textarea v-model="newReview.review" placeholder="Write your review" class="form-control mb-3"></textarea>
        <button @click="submitReview" class="btn btn-primary">Submit Review</button>
      </div>
      <div v-for="(review, index) in restaurant.customerReviews" :key="index" class="card p-3 mb-2">
        <h6>{{ review.name }}</h6>
        <p>{{ review.review }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'DetailPage',
  data() {
    return {
      restaurant: null,
      loading: true,
      error: null,
      isFavorite: false,
      newReview: {
        name: '',
        review: ''
      }
    }
  },
  computed: {
    imageUrl() {
      return this.restaurant 
        ? api.getRestaurantImageUrl(this.restaurant.pictureId) 
        : '';
    }
  },
  methods: {
    async fetchRestaurantDetail() {
      try {
        this.loading = true;
        const id = this.$route.params.id;
        
        // Add error logging
        console.log('Fetching restaurant with ID:', id);
        
        this.restaurant = await api.getRestaurantDetail(id);
        
        // Add additional logging
        console.log('Fetched restaurant:', this.restaurant);
        
        // Check if this restaurant is already a favorite
        this.isFavorite = api.isFavorite(this.restaurant.id);
      } catch (error) {
        // More detailed error logging
        console.error('Failed to load restaurant details:', error);
        this.error = `Failed to load restaurant details: ${error.message}. Please try again.`;
      } finally {
        this.loading = false;
      }
    },
    toggleFavorite() {
      if (!this.restaurant) {
        console.error('No restaurant to favorite');
        return;
      }
      
      if (this.isFavorite) {
        // Remove from favorites
        api.removeFromFavorites(this.restaurant.id);
        this.isFavorite = false;
      } else {
        // Add to favorites
        const added = api.addToFavorites(this.restaurant);
        this.isFavorite = added;
      }
    },
    async submitReview() {
      if (!this.restaurant) {
        console.error('No restaurant to submit review for');
        return;
      }
      
      if (!this.newReview.name || !this.newReview.review) {
        alert('Please provide both name and review');
        return;
      }

      try {
        const reviewData = {
          id: this.restaurant.id,
          ...this.newReview
        };
        this.restaurant.customerReviews = await api.addReview(reviewData);
        
        // Reset review form
        this.newReview.name = '';
        this.newReview.review = '';
      } catch (error) {
        console.error('Failed to submit review:', error);
        alert(`Failed to submit review: ${error.message}`);
      }
    }
  },
  mounted() {
    this.fetchRestaurantDetail();
  },
  // Add error handling for route changes
  beforeRouteUpdate(to, from, next) {
    this.fetchRestaurantDetail();
    next();
  }
}
</script>

<style scoped>

</style>