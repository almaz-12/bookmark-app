<script setup lang="ts">
interface UserAvatarProps {
  url: string;
  width: number;
}
const { url } = defineProps<UserAvatarProps>();
</script>

<template>
  <img :src="url" :width="width" />
</template>

<style></style>
