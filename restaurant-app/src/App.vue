<!-- src/App.vue -->
<template>
  <div id="app" :class="{'dark-mode': isDarkMode}">
    <nav class="navbar navbar-expand-lg navbar-custom fixed-top shadow-sm">
      <div class="container-fluid px-4">
        <!-- Logo/Brand with more styling -->
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <i class="fas fa-utensils me-2"></i>
          <span class="fw-bold brand-text">Restaurant Explorer</span>
        </router-link>
        
        <!-- Responsive Toggle Button -->
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Navigation Menu -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li class="nav-item mx-2">
              <router-link to="/" class="nav-link" active-class="active">
                <i class="fas fa-home me-1"></i> Home
              </router-link>
            </li>
            <li class="nav-item mx-2">
              <router-link to="/favorites" class="nav-link" active-class="active">
                <i class="fas fa-heart me-1"></i> Favorites
              </router-link>
            </li>
            <li class="nav-item mx-2">
              <button 
                @click="toggleDarkMode" 
                class="btn btn-outline-mode d-flex align-items-center"
              >
                <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class="me-1"></i>
                {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <!-- Add padding to body to prevent content from being hidden behind fixed navbar -->
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
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
      localStorage.setItem('dark-mode', this.isDarkMode);
      
      // Optional: Add a class to body for global dark mode styling
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    },
  },
  mounted() {
    // Memuat preferensi dark mode pengguna dari localStorage
    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode !== null) {
      this.isDarkMode = savedMode === 'true';
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  },
};
</script>

<style scoped>
/* Base Styles */
#app {
  transition: background-color 0.3s, color 0.3s;
}

.content-wrapper {
  padding-top: 80px; /* Adjust based on navbar height */
}

/* Navbar Customization */
.navbar-custom {
  transition: all 0.3s ease;
}

/* Brand Text Styles */
.brand-text {
  color: inherit;
  transition: color 0.3s ease;
}

/* Light Mode */
.navbar-custom {
  background-color: #f8f9fa;
  color: #495057;
}

.navbar-custom .brand-text {
  color: #2c3e50;
}

.navbar-custom .nav-link {
  color: #495057;
  transition: color 0.3s ease;
}

.navbar-custom .nav-link:hover,
.navbar-custom .nav-link.active {
  color: #007bff;
}

/* Dark Mode Styles */
.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}

.dark-mode .navbar-custom {
  background-color: #1e1e1e;
  color: #f8f9fa;
}

.dark-mode .brand-text {
  color: #f8f9fa;
}

.dark-mode .navbar-custom .nav-link {
  color: #f8f9fa;
}

.dark-mode .navbar-custom .nav-link:hover,
.dark-mode .navbar-custom .nav-link.active {
  color: #4da6ff;
}

/* Dark Mode Toggle Button */
.btn-outline-mode {
  transition: all 0.3s ease;
}

/* Light Mode Button */
.navbar-custom .btn-outline-mode {
  color: #495057;
  border-color: #495057;
}

.navbar-custom .btn-outline-mode:hover {
  background-color: #495057;
  color: #f8f9fa;
}

/* Dark Mode Button */
.dark-mode .btn-outline-mode {
  color: #f8f9fa;
  border-color: #f8f9fa;
}

.dark-mode .btn-outline-mode:hover {
  background-color: #f8f9fa;
  color: #121212;
}
</style>