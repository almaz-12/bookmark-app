<script setup lang="ts">
import type { Bookmark } from '@/interfaces/bookmark.interfaces';
import BookmarkCard from './BookmarkCard.vue';
import { useBookmarkStore } from '@/stores/bookmark.store';

const props = defineProps<{ data: Bookmark[] }>();
const bookmarkStore = useBookmarkStore();
</script>

<template>
  <div class="bookmark-list">
    <BookmarkCard v-if="props.data" v-bind="card" v-for="card in props.data" :key="card.id" />
    <button @click="bookmarkStore.createBookmark(1)">Создать</button>
  </div>
</template>

<style scoped>
.bookmark-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 35px;
  padding-top: 50px;
}
</style>
