<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import { useAuthStore } from '@/stores/auth.store';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { validator } from '@/utils/validator';

const form = reactive({
  email: '',
  password: '',
});
const authStore = useAuthStore();
const router = useRouter();

const isValidForm = computed(() => {
  return form.email.trim() && validator.email(form.email) && validator.password(form.password);
});

async function submitForm() {
  if (!isValidForm.value) return;

  try {
    await authStore.login(form.email, form.password);

    if (authStore.getToken) {
      router.push('/');
      Object.assign(form, { email: '', password: '' });
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
}
</script>

<template>
  <div class="auth">
    <h1 class="auth__title">Bookmarkly</h1>
    <div class="error-message" v-if="authStore.errorMessage">
      {{ authStore.errorMessage }}
    </div>
    <form class="auth__form" @submit.prevent="submitForm">
      <AppInput placeholder="Введите email" v-model="form.email" type="email" required />
      <AppInput placeholder="Введите пароль" v-model="form.password" type="password" required />
      <AppButton :disabled="!isValidForm || authStore.isLoading">
        {{ authStore.isLoading ? 'Загрузка' : 'Вход' }}
      </AppButton>
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
.error-message {
  color: #d32f2f;
  background-color: #ffebee;
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid #f44336;
  max-width: 274px;
  width: 100%;
  text-align: center;
}

/* ✅ Адаптивность */
@media (max-width: 480px) {
  .auth__title {
    font-size: 42px;
  }

  .auth__form {
    max-width: 100%;
  }
}
</style>
