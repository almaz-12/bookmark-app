<script setup lang="ts">
import { ROUTE_NAMES } from '@/common/constants';
import AppButton from '@/components/AppButton.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

function redirectToMain() {
  router.push({
    name: ROUTE_NAMES.MAIN,
  });
}
</script>

<template>
  <div class="not-found">
    <h1 class="not-found__title">404</h1>
    <AppButton @click="redirectToMain">На главную</AppButton>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  gap: 52px;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.not-found__title {
  font-size: 154px;
  font-weight: 700;
}
</style>
