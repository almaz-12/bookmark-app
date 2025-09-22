<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';

const form = ref<{ email?: string; password?: string }>({});
const authStore = useAuthStore();

function submitForm() {
  console.log('send');
  if (!form.value.email || !form.value.password) return;

  authStore.login(form.value.email, form.value.password);
  form.value = {};
}
</script>

<template>
  <div class="auth">
    <h1 class="auth__title">Bookmarkly</h1>
    <form class="auth__form" @submit.prevent="submitForm">
      <AppInput placeholder="Введите email" v-model="form.email" type="text" />
      <AppInput placeholder="Введите пароль" v-model="form.password" type="password" />
      <AppButton>Вход</AppButton>
    </form>
  </div>
</template>

<style scoped>
.auth {
  display: flex;
  flex-direction: column;
  gap: 28px;
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
