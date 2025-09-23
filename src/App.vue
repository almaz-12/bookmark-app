<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();

onMounted(() => {
  authStore.initToken();
});
</script>

<template>
  <RouterView />
</template>
