import { BASE_ROUTES } from '@/common/constants';
import type { User } from '@/interfaces/user.interfaces';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const userData = ref<User>();
  const errorMessage = ref('');
  const isLoading = ref(false);

  async function fetchData() {
    try {
      errorMessage.value = '';
      isLoading.value = true;

      const response = await fetch(BASE_ROUTES.user);

      if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

      const data = (await response.json()) as User;
      userData.value = data;

      return data;
    } catch (error) {
      errorMessage.value = 'Не удалось загрузить данные';
      throw error;
    } finally {
      console.error(errorMessage);
      isLoading.value = false;
    }
  }

  return { userData, fetchData };
});
