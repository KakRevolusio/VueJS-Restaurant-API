<!-- src/views/DetailPage.vue -->
<template>
  <div v-if="loading" class="loading">
    Loading restaurant details...
  </div>

  <div v-else-if="error" class="error">
    {{ error }}
  </div>

  <div v-else-if="restaurant" class="restaurant-detail">
    <div class="restaurant-header">
      <img 
        :src="imageUrl" 
        :alt="restaurant.name" 
        class="restaurant-image"
      >
      <div class="restaurant-basic-info">
        <div class="name-and-favorite">
          <h1>{{ restaurant.name }}</h1>
          <button 
            @click="toggleFavorite" 
            class="favorite-btn"
            :class="{ 'is-favorite': isFavorite }"
          >
            {{ isFavorite ? '❤️' : '🤍' }}
          </button>
        </div>
        <div class="location-rating">
          <span>📍 {{ restaurant.city }}, {{ restaurant.address }}</span>
          <span>⭐ {{ restaurant.rating }}/5</span>
        </div>
        <div class="categories">
          Categories: 
          {{ restaurant.categories.map(cat => cat.name).join(', ') }}
        </div>
      </div>
    </div>

    <div class="restaurant-description">
      <h2>Description</h2>
      <p>{{ restaurant.description }}</p>
    </div>

    <div class="restaurant-menu">
      <div class="foods">
        <h2>Foods</h2>
        <ul>
          <li v-for="food in restaurant.menus.foods" :key="food.name">
            {{ food.name }}
          </li>
        </ul>
      </div>
      <div class="drinks">
        <h2>Drinks</h2>
        <ul>
          <li v-for="drink in restaurant.menus.drinks" :key="drink.name">
            {{ drink.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="customer-reviews">
      <h2>Customer Reviews</h2>
      <div class="review-form">
        <input 
          v-model="newReview.name" 
          placeholder="Your Name" 
          class="review-input"
        >
        <textarea 
          v-model="newReview.review" 
          placeholder="Write your review" 
          class="review-textarea"
        ></textarea>
        <button @click="submitReview" class="submit-review-btn">
          Submit Review
        </button>
      </div>
      <div 
        v-for="(review, index) in restaurant.customerReviews" 
        :key="index" 
        class="review"
      >
        <strong>{{ review.name }}</strong>
        <span class="review-date">{{ review.date }}</span>
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
/* Previous styles remain the same */
.error {
  color: red;
  text-align: center;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
}
</style>