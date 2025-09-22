import { BASE_ROUTES, http } from '@/common/constants';
import type { Auth } from '@/interfaces/auth.interfaces';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<Auth>();
  const errorMessage = ref('');
  const isLoading = ref(false);

  async function login(email: string, password: string) {
    try {
      errorMessage.value = '';
      isLoading.value = true;

      const response = await http.post<Auth>(BASE_ROUTES.auth.login, {
        email,
        password,
      });
      if (response.status !== 200) throw new Error(`Ошибка HTTP: ${response.status}`);

      token.value = response.data;
    } catch (error) {
      errorMessage.value = 'Не удалось получить токен';
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return { token, login };
});
