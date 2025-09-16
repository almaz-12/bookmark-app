<script setup lang="ts">
import type { Category } from '@/interfaces/category.interfaces';
defineProps<Category>();
</script>

<template>
  <div class="category-item">
    <a class="category-item__link" :href="`/${alias}`">{{ name }}</a>
  </div>
</template>

<style>
.category-item__link {
  color: var(--color-fg);
  font-size: 16px;
  text-decoration: none;
}
.category-item__link:hover {
  font-weight: bold;
}
</style>
