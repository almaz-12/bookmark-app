<script setup lang="ts">
import UserAvatar from './UserAvatar.vue';
import { onMounted } from 'vue';
import { useUserStore } from '../stores/user.store';

const store = useUserStore();

onMounted(async () => {
  await store.fetchUser();
});
</script>

<template>
  <div class="user-profile" v-if="store.userData" :name="store.userData.name">
    <UserAvatar :url="store.userData.avatar" :width="80" :alt="store.userData.avatar" />
    <div>Привет, {{ store.userData.name }}!</div>
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
