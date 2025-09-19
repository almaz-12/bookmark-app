<script setup lang="ts"></script>

<template>
  <section class="hero-section">
    <h1>Добро пожаловать в Bookmarkly!</h1>
    <p>Чтобы начать пользоваться выберите категорию закладок или создайте новую.</p>
  </section>
</template>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.hero-section h1 {
  margin: 0;
  font-weight: 500;
  font-size: 24px;
  letter-spacing: 2%;
}
</style>
