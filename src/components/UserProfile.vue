<script setup lang="ts">
import UserAvatar from './UserAvatar.vue';
import { onMounted } from 'vue';
import { useUserStore } from '../stores/user.store';
import { useAuthStore } from '@/stores/auth.store';

const userStore = useUserStore();
const authStore = useAuthStore();

onMounted(async () => {
  await userStore.fetchUser();
});
</script>

<template>
  <div class="user-profile" v-if="userStore.userData" :name="userStore.userData.name">
    <UserAvatar :url="userStore.userData.avatar" :width="80" :alt="userStore.userData.avatar" />
    <div>Привет, {{ userStore.userData.name }}!</div>
    <a href="#" @click="authStore.logout">Выход</a>
  </div>
</template>

<style>
.user-profile {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 18px;
  margin-bottom: 40px;
}
</style>
