<script setup lang="ts">
import type { Bookmark } from '@/interfaces/bookmark.interfaces';
import BookmarkCard from './BookmarkCard.vue';

const props = defineProps<{ data: Bookmark[] }>();
</script>

<template>
  <div class="bookmark-list" v-if="props" v-for="card in props.data" :key="card.id">
    <BookmarkCard v-if="card" v-bind="card" />
  </div>
</template>

<style scoped>
.bookmark-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 35px;
  padding-top: 70px;
}
</style>
