<script setup lang="ts">
import type { Bookmark } from '@/interfaces/bookmark.interfaces';
import BookmarkCard from './BookmarkCard.vue';
import BookmarkAdd from './BookmarkAdd.vue';

const props = defineProps<{ data: Bookmark[] }>();
</script>

<template>
  <div class="bookmark-list">
    <BookmarkCard v-if="props.data" v-bind="card" v-for="card in props.data" :key="card.id" />
    <BookmarkAdd />
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
