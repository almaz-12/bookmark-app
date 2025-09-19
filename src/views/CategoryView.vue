<script setup lang="ts">
import type { Category } from '@/interfaces/category.interfaces';
import { useBookmarkStore } from '@/stores/bookmark.store';
import { useCategoryStore } from '@/stores/category.store';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const category = ref<Category>();
const route = useRoute();
const state = useCategoryStore();
const stateBookmark = useBookmarkStore();

watch(
  () => ({
    alias: route.params.alias,
    categories: state.categories,
  }),
  (data) => {
    category.value = state.getCategoryByAlias(data.alias);
  },
);

onMounted(async () => {
  await stateBookmark.fetchBookmarks(1);
});

async function createBook() {
  await stateBookmark.createBookmark(1);
}
async function deleteBook() {
  await stateBookmark.deleteBookmark(1);
}
</script>

<template>
  <h2>{{ category?.name }}</h2>
  <button @click="createBook">Создать закладку</button>
  <button @click="deleteBook">Удалить закладку</button>
</template>

<style scoped></style>
