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
          <h1>{{ restaurant.name }}</h1>
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
          this.restaurant = await api.getRestaurantDetail(id);
        } catch (error) {
          this.error = 'Failed to load restaurant details. Please try again.';
        } finally {
          this.loading = false;
        }
      },
      async submitReview() {
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
          alert('Failed to submit review. Please try again.');
        }
      }
    },
    mounted() {
      this.fetchRestaurantDetail();
    }
  }
  </script>
  
  <style scoped>
  .restaurant-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .restaurant-header {
    display: flex;
    margin-bottom: 20px;
  }
  
  .restaurant-image {
    width: 300px;
    height: 200px;
    object-fit: cover;
    margin-right: 20px;
  }
  
  .restaurant-menu {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .review-form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  .review-input, .review-textarea {
    margin-bottom: 10px;
    padding: 10px;
  }
  
  .submit-review-btn {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  