<script setup lang="ts">
import UserProfile from './components/UserProfile.vue';
</script>

<template>
  <div class="app">
    <div class="wrap">
      <div class="app__main">
        <nav class="nav">
          <UserProfile />
        </nav>
        <main>контент</main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}
.wrap {
  max-width: 1450px;
  padding: 140px 15px 50px;
  margin: 0 auto;
}
.app__main {
  display: flex;
}
.nav {
  max-width: 300px;
  width: 100%;
}
</style>
