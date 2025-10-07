<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';

const data = defineModel<string>();

interface Props {
  placeholder?: string;
  autofocus?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  autofocus: false,
});

const input = useTemplateRef('input');

onMounted(() => {
  if (props.autofocus) {
    input.value?.focus();
  }
});
</script>

<template>
  <input ref="input" class="input" v-model="data" :placeholder="props.placeholder" />
</template>

<style>
.input {
  border: none;
  border-bottom: 1px solid var(--color-fg);
  font-size: 20px;
  width: 100%;
  padding: 5px 5px 5px 5px;
  height: 32px;
  font-weight: 500;
}
.input--small {
  font-size: 16px;
}
.input::placeholder {
  color: var(--color-inactive);
}
</style>
