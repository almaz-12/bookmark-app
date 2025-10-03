<script setup lang="ts">
import { SORT_OPTIONS } from '@/common/constants';
const { sortField } = defineProps<{ sortField: string }>();
import type { SortOptions } from '@/interfaces/bookmark.interfaces';

const emit = defineEmits<{
  (e: 'sort', option: SortOptions): void;
}>();

function handleSortClick(option: SortOptions) {
  emit('sort', option);
}
</script>

<template>
  <div class="sort">
    <button
      class="sort-item"
      :class="item.sortField == sortField ? 'active' : ''"
      v-for="item in SORT_OPTIONS"
      :key="item.sortField"
      @click="handleSortClick({ sortBy: item.sortField, sortOrder: 'asc' })"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped>
.sort {
  display: flex;
  gap: 8px;
  margin-top: 40px;
}
.sort-item {
  background: none;
  border: none;
  font-size: 16px;
  color: var(--color-inactive);
  cursor: pointer;
}
.sort-item.active {
  color: var(--color-fg);
  border-bottom: 2px solid var(--color-fg);
  font-weight: 700;
}
</style>
