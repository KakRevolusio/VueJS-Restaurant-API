<!-- src/App.vue -->
<template>
  <div id="app" :class="{'dark-mode': isDarkMode}">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand text-center">Restaurant Explorer</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/favorites" class="nav-link">Favorites</router-link>
            </li>
            <li> <button @click="toggleDarkMode" class="btn btn-outline-light">
        Toggle Dark Mode
      </button></li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('dark-mode', this.isDarkMode); // Simpan preferensi pengguna
    },
  },
  mounted() {
    // Memuat preferensi dark mode pengguna dari localStorage
    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode !== null) {
      this.isDarkMode = savedMode === 'true';
    }
  },
};
</script>

<style scoped>
#app {
  transition: background-color 0.3s, color 0.3s;
}

/* Dark Mode Styles */
.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}

.dark-mode .nav-link {
  color: #fff;
}

.dark-mode .btn-outline-light {
  color: #fff;
  border-color: #fff;
}

.dark-mode .btn-outline-light:hover {
  background-color: #fff;
  color: #121212;
}
</style>