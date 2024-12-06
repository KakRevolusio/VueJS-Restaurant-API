<!-- src/components/RestaurantCard.vue -->
<template>
    <div class="restaurant-card">
      <img 
        :src="imageUrl" 
        :alt="restaurant.name" 
        class="restaurant-image"
      >
      <div class="restaurant-info">
        <h3>{{ restaurant.name }}</h3>
        <p>{{ restaurant.description }}</p>
        <div class="restaurant-details">
          <span class="city">{{ restaurant.city }}</span>
          <span class="rating">⭐ {{ restaurant.rating }}</span>
        </div>
        <router-link 
          :to="{ name: 'detail', params: { id: restaurant.id } }" 
          class="view-details-btn"
        >
          View Details
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    name: 'RestaurantCard',
    props: {
      restaurant: {
        type: Object,
        required: true
      }
    },
    computed: {
      imageUrl() {
        return api.getRestaurantImageUrl(this.restaurant.pictureId);
      }
    }
  }
  </script>
  
  <style scoped>
  .restaurant-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .restaurant-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .restaurant-info {
    padding: 15px;
  }
  
  .restaurant-details {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  
  .view-details-btn {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
  }
  </style>