<!-- src/components/RestaurantCard.vue -->
<template>
    <div class="card mb-4 shadow-sm">
    <img :src="imageUrl" :alt="restaurant.name" class="card-img-top" style="height: 200px; object-fit: cover;">
    <div class="card-body">
      <h5 class="card-title">{{ restaurant.name }}</h5>
      <p class="card-text">{{ restaurant.description }}</p>
      <div class="d-flex justify-content-between">
        <span class="text-muted">{{ restaurant.city }}</span>
        <span class="text-warning">⭐ {{ restaurant.rating }}</span>
      </div>
      <router-link :to="{ name: 'detail', params: { id: restaurant.id } }" class="btn btn-primary w-100 mt-3">View Details</router-link>
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
  
  </style>