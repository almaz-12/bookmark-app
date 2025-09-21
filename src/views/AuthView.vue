<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import { ref } from 'vue';

const form = ref<{ email?: string; password?: string }>({});

function submitForm() {
  console.log('send');
  form.value = {};
}
</script>

<template>
  <div class="auth">
    <h1 class="auth__title">Bookmarkly</h1>
    <form class="auth__form" @submit.prevent="submitForm">
      <AppInput placeholder="Введите email" v-model="form.email" />
      <AppInput placeholder="Введите пароль" v-model="form.password" />
      <AppButton>Вход</AppButton>
    </form>
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
.auth__form {
  display: flex;
  flex-direction: column;
  gap: 26px;
  align-items: center;
  justify-content: center;
  max-width: 274px;
  width: 100%;
}
.auth__title {
  font-size: 52px;
  font-weight: 700;
}
</style>
