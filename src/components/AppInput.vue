<script setup lang="ts">
const data = defineModel<string>();
const { placeholder } = defineProps<{ placeholder?: string }>();
</script>

<template>
  <input class="input" v-model="data" :placeholder="placeholder" />
</template>

<style>
.input {
  border: none;
  border-bottom: 1px solid var(--color-fg);
  font-size: 17px;
  width: 100%;
  padding: 5px 5px 5px 5px;
  height: 32px;
  font-weight: 600;
}
.input::placeholder {
  color: var(--color-inactive);
}
</style>
