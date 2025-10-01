<script setup lang="ts">
const { size = 32 } = defineProps<{ size?: number }>();
</script>

<template>
  <button class="action-btn" :style="{ width: `${size}px`, height: `${size}px` }">
    <slot></slot>
  </button>
</template>

<style>
.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-fg);
  cursor: pointer;
  border: 0;
  border-radius: 100%;
}
.action-btn:hover {
  background: var(--color-fg-hover);
}

.action-btn--white {
  border: 2px solid var(--color-bg);
}
</style>
