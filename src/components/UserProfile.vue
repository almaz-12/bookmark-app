<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '../stores/user.store';

import ActionButton from './ActionButton.vue';
import IconLogout from '@/icons/IconLogout.vue';
import UserAvatar from './UserAvatar.vue';

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUser();
});
</script>

<template>
  <div class="user-profile" v-if="userStore.userData" :name="userStore.userData.name">
    <UserAvatar :url="userStore.userData.avatar" :width="80" :alt="userStore.userData.avatar" />
    <div class="user-profile__box">
      Привет, {{ userStore.userData.name }}!
      <ActionButton :size="22" title="Выход">
        <IconLogout />
      </ActionButton>
    </div>
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
.user-profile__box {
  display: flex;
  gap: 10px;
}
</style>
