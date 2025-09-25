import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { TOKEN_KEY } from '@/common/constants';
import { BASE_ROUTES, http } from '@/common/constants';
import type { Auth } from '@/interfaces/auth.interfaces';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const errorMessage = ref('');
  const isLoading = ref(false);

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem(TOKEN_KEY, newToken);
  }

  const getToken = computed(() => token.value);
  const isAuthenticated = computed(() => !!token.value);

  async function login(email: string, password: string): Promise<void> {
    try {
      errorMessage.value = '';
      isLoading.value = true;

      const response = await http.post<Auth>(BASE_ROUTES.auth.login, {
        email,
        password,
      });
      if (response.status !== 200) throw new Error(`Ошибка HTTP: ${response.status}`);
      setToken(response.data.token);
    } catch (error: any) {
      errorMessage.value = error.response.data.error;
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  // Функция для инициализации токена при загрузке приложения
  function initToken() {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      token.value = storedToken;
    }
  }

  // Функция выхода
  function logout() {
    token.value = null;
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    getToken,
    login,
    setToken,
    logout,
    initToken,
    isAuthenticated,
    errorMessage: computed(() => errorMessage.value),
    isLoading: computed(() => isLoading.value),
  };
});
