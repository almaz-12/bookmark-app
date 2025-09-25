<script setup lang="ts">
import type { Category } from '@/interfaces/category.interfaces';
import { RouterLink } from 'vue-router';
defineProps<Category>();
</script>

<template>
  <div class="category-item">
    <RouterLink
      :to="`/category/${alias}`"
      active-class="category-item__link--active"
      class="category-item__link"
      >{{ name }}</RouterLink
    >
  </div>
</template>

<style>
.category-item__link {
  color: var(--color-fg);
  font-size: 16px;
  text-decoration: none;
}
.category-item__link--active,
.category-item__link:hover {
  color: #3aab89;
}
</style>
