<template>
  <div class="card mb-4 shadow-sm" :class="{ 'bg-dark text-white': isDarkMode }">
    <img 
      :src="imageUrl" 
      :alt="restaurant.name" 
      class="card-img-top" 
      style="height: 200px; object-fit: cover;"
    />
    <div class="card-body">
      <h5 class="card-title">{{ restaurant.name }}</h5>
      <p class="card-text">
        {{ truncatedDescription }}
      </p>
      <div class="d-flex justify-content-between">
        <span class="text-muted">{{ restaurant.city }}</span>
        <span class="text-warning">⭐ {{ restaurant.rating }}</span>
      </div>
      <router-link 
        :to="{ name: 'detail', params: { id: restaurant.id } }" 
        class="btn btn-primary w-100 mt-3"
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
.card {
  margin-bottom: 20px;
  transition: background-color 0.3s, color 0.3s;
}

/* Dark Mode for Card */
.bg-dark {
  background-color: #333;
  color: #fff;
}

.text-white {
  color: #fff;
}
</style>
