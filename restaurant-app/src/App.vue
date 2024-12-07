<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/favorites">Favorites</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

nav {
  padding: 20px;
  background-color: #f8f9fa;
}

.nav-link {
  color: #007bff;
  text-decoration: none;
  margin-right: 15px;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>