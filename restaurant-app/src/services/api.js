// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://restaurant-api.dicoding.dev';

export default {
  // Get list of all restaurants
  async getRestaurants() {
    try {
      const response = await axios.get(`${BASE_URL}/list`);
      return response.data.restaurants;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw error;
    }
  },

  // Get restaurant details by ID
  async getRestaurantDetail(id) {
    try {
      const response = await axios.get(`${BASE_URL}/detail/${id}`);
      return response.data.restaurant;
    } catch (error) {
      console.error(`Error fetching restaurant details for ID ${id}:`, error);
      throw error;
    }
  },

  // Search restaurants
  async searchRestaurants(query) {
    try {
      const response = await axios.get(`${BASE_URL}/search?q=${query}`);
      return response.data.restaurants;
    } catch (error) {
      console.error('Error searching restaurants:', error);
      throw error;
    }
  },

  // Add review to a restaurant
  async addReview(reviewData) {
    try {
      const response = await axios.post(`${BASE_URL}/review`, reviewData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data.customerReviews;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },

  // Get restaurant image URL
  getRestaurantImageUrl(pictureId, size = 'small') {
    return `${BASE_URL}/images/${size}/${pictureId}`;
  }
};