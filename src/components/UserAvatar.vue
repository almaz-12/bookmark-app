<script setup lang="ts">
import type { UserAvatarProps } from '@/interfaces/user.interfaces';

const { url } = defineProps<UserAvatarProps>();
</script>

<template>
  <a href="/"><img :src="url" :width="width" /></a>
</template>

<style></style>
