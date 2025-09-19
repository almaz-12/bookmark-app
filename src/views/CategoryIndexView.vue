<script setup lang="ts">
import { useCategoryStore } from '@/stores/category.store';

const state = useCategoryStore();

async function createCat() {
  await state.createCategory();
}
</script>

<template>
  <section class="hero-section">
    <h1>Добро пожаловать в Bookmarkly!</h1>
    <p>Чтобы начать пользоваться выберите категорию закладок или создайте новую.</p>
    <button @click="createCat">Создать категорию</button>
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
