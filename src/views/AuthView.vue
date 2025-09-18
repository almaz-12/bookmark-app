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
  <div class="auth">
    <h1 class="auth__title">Bookmarkly</h1>
    <AppButton @click="redirectToMain">Вход</AppButton>
  </div>
</template>

<style scoped>
.auth {
  display: flex;
  flex-direction: column;
  gap: 52px;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.auth__title {
  font-size: 52px;
  font-weight: 700;
}
</style>
