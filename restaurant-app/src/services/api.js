import axios from 'axios';

const BASE_URL = 'https://restaurant-api.dicoding.dev';
const FAVORITES_KEY = 'favoriteRestaurants';

// Create an axios instance with default configs
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor for logging
api.interceptors.request.use(
  config => {
    console.log('API Request:', config.url, config.method);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for logging
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.data);
    return response;
  },
  error => {
    console.error('API Response Error:', error);
    return Promise.reject(error);
  }
);

export default {
  // Get list of all restaurants
  async getRestaurants() {
    try {
      const response = await api.get('/list');
      return response.data.restaurants;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw new Error('Unable to fetch restaurants. Please check your connection.');
    }
  },

  // Get restaurant details by ID
  async getRestaurantDetail(id) {
    if (!id) {
      throw new Error('Restaurant ID is required');
    }

    try {
      const response = await api.get(`/detail/${id}`);
      
      // Validate response structure
      if (!response.data || !response.data.restaurant) {
        throw new Error('Invalid restaurant data received');
      }
      
      return response.data.restaurant;
    } catch (error) {
      console.error(`Error fetching restaurant details for ID ${id}:`, error);
      throw new Error(`Unable to fetch restaurant details. ${error.message}`);
    }
  },

  // Search restaurants
  async searchRestaurants(query) {
    try {
      const response = await api.get(`/search?q=${query}`);
      return response.data.restaurants;
    } catch (error) {
      console.error('Error searching restaurants:', error);
      throw new Error('Unable to search restaurants. Please try again.');
    }
  },

  // Add review to a restaurant
  async addReview(reviewData) {
    try {
      const response = await api.post('/review', reviewData);
      return response.data.customerReviews;
    } catch (error) {
      console.error('Error adding review:', error);
      throw new Error('Failed to submit review. Please try again.');
    }
  },

  // Get restaurant image URL
  getRestaurantImageUrl(pictureId, size = 'small') {
    if (!pictureId) {
      return ''; // Return empty string if no picture ID
    }
    return `${BASE_URL}/images/${size}/${pictureId}`;
  },

  // Favorites management methods
  getFavorites() {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error retrieving favorites:', error);
      return [];
    }
  },

  addToFavorites(restaurant) {
    if (!restaurant || !restaurant.id) {
      console.error('Invalid restaurant to add to favorites');
      return false;
    }

    try {
      const favorites = this.getFavorites();
      const exists = favorites.some(fav => fav.id === restaurant.id);
      
      if (!exists) {
        favorites.push(restaurant);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  },

  removeFromFavorites(restaurantId) {
    if (!restaurantId) {
      console.error('Invalid restaurant ID to remove from favorites');
      return [];
    }

    try {
      let favorites = this.getFavorites();
      favorites = favorites.filter(fav => fav.id !== restaurantId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return favorites;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return [];
    }
  },

  isFavorite(restaurantId) {
    if (!restaurantId) {
      return false;
    }

    const favorites = this.getFavorites();
    return favorites.some(fav => fav.id === restaurantId);
  }
};