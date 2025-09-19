<script setup lang="ts">
import type { Category } from '@/interfaces/category.interfaces';
import { useCategoryStore } from '@/stores/category.store';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const category = ref<Category>();
const route = useRoute();
const state = useCategoryStore();

watch(
  () => ({
    alias: route.params.alias,
    categories: state.categories,
  }),
  (data) => {
    category.value = state.getCategoryByAlias(data.alias);
  },
);
</script>

<template>
  <h2>{{ category?.name }}</h2>
</template>

<style scoped></style>
