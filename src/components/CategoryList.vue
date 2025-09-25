<script setup lang="ts">
import CategoryItem from './CategoryItem.vue';
import { onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category.store';

const store = useCategoryStore();
onMounted(() => {
  store.fetchCategories();
});
</script>

<template>
  <div class="category-list" v-if="store.categories">
    <CategoryItem v-for="item in store.categories" v-bind="item" :key="item.id" />
  </div>
</template>

<style>
.category-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 34px;
}
</style>
