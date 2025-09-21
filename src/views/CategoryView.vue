<script setup lang="ts">
import type { Category } from '@/interfaces/category.interfaces';
import { useBookmarkStore } from '@/stores/bookmark.store';
import { useCategoryStore } from '@/stores/category.store';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const category = ref<Category>();
const route = useRoute();
const categoryStore = useCategoryStore();
const bookmarkStore = useBookmarkStore();

console.log(route.params.alias);

watch(
  () => route.params.alias,
  async () => {
    console.log(route.params.alias);
    category.value = categoryStore.getCategoryByAlias(route.params.alias);
    if (category.value) {
      await bookmarkStore.fetchBookmarks(category.value.id);
    }
  },
);

async function createBook() {
  await bookmarkStore.createBookmark(1);
}
async function deleteBook() {
  await bookmarkStore.deleteBookmark(1);
}

onMounted(async () => {
  console.log('onMounted');
  category.value = categoryStore.getCategoryByAlias(route.params.alias);
  if (category.value) {
    await bookmarkStore.fetchBookmarks(category.value.id);
  }
});
</script>

<template>
  <h2>{{ category?.name }} ({{ bookmarkStore.bookmarks?.length }})</h2>
  <button @click="createBook">Создать закладку</button>
  <button @click="deleteBook">Удалить закладку</button>
</template>

<style scoped></style>
