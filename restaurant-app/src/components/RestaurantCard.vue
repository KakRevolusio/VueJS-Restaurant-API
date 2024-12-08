<template>
  <div 
    class="card restaurant-card mb-4 mp-1 shadow-sm" 
    :class="{ 
      'bg-dark text-white': isDarkMode,
      'card-hover': true 
    }"
  >
    <div class="card-image-wrapper mt-2">
      <img 
        :src="imageUrl" 
        :alt="restaurant.name" 
        class="card-img-top" 
        style="height: 200px; object-fit: cover;"
      />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ restaurant.name }}</h5>
      <p class="card-text">
        {{ truncatedDescription }}
      </p>
      <div class="d-flex justify-content-between mb-3">
        <span class="text-muted">{{ restaurant.city }}</span>
        <span class="text-warning">⭐ {{ restaurant.rating }}</span>
      </div>
      <router-link 
        :to="{ name: 'detail', params: { id: restaurant.id } }" 
        class="btn btn-primary w-100"
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
    },
    truncatedDescription() {
      // Menampilkan deskripsi hanya sampai 100 karakter, menambahkan "..." jika lebih panjang
      return this.restaurant.description.length > 100
        ? this.restaurant.description.slice(0, 100) + '...'
        : this.restaurant.description;
    },
    isDarkMode() {
      // Mengambil nilai Dark Mode dari root instance
      return this.$root.isDarkMode;
    }
  }
};
</script>

<style scoped>
.restaurant-card {
  margin-bottom: 20px;
  transition: 
    transform 0.3s ease, 
    box-shadow 0.3s ease, 
    background-color 0.3s ease, 
    color 0.3s ease;
}

/* Hover Effect */
.card-hover {
  cursor: pointer;
}

.card-hover:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 20px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06);
}

/* Light Mode Hover */
.card-hover:not(.bg-dark):hover {
  background-color: #f8f9fa;
}

/* Dark Mode Hover */
.card-hover.bg-dark:hover {
  background-color: #444;
}

/* Dark Mode for Card */
.bg-dark {
  background-color: #333;
  color: #fff;
}

.text-white {
  color: #fff;
}

/* Image Wrapper for potential future effects */
.card-image-wrapper {
  overflow: hidden;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.card-image-wrapper img {
  transition: transform 0.3s ease;
}

.card-hover:hover .card-image-wrapper img {
  transform: scale(1.05);
}

/* Button Hover Effect */
.btn-primary {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.card-hover:hover .btn-primary {
  transform: translateY(-2px);
}

/* Light Mode Button Hover */
.card-hover:not(.bg-dark):hover .btn-primary {
  background-color: #0056b3;
  border-color: #0056b3;
}

/* Dark Mode Button Hover */
.card-hover.bg-dark:hover .btn-primary {
  background-color: #4da6ff;
  border-color: #4da6ff;
}
</style>