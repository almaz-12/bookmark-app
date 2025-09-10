<script setup lang="ts">
import UserAvatar from './UserAvatar.vue';
import { AVATAR_URL } from '../common/constants';

interface UserProfileProps {
  name: string;
}
const { name } = defineProps<UserProfileProps>();
</script>

<template>
  <div class="user-profile">
    <UserAvatar :url="AVATAR_URL" :width="80" />
    <div>Привет, {{ name }}!</div>
  </div>
</template>

<style>
.user-profile {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 18px;
}
</style>
