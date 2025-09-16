<script setup lang="ts">
const { size = 32 } = defineProps<{ size?: number }>();
</script>

<template>
  <button class="create-btn" :style="{ width: `${size}px`, height: `${size}px` }">
    <slot></slot>
  </button>
</template>

<style>
.create-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-fg);
  cursor: pointer;
  border: 0;
  border-radius: 100%;
}
.create-btn:hover {
  background: var(--color-fg-hover);
}
</style>
