import { BASE_ROUTES, http } from '@/common/constants';
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

      // await http
      //   .post('/categories', {
      //     name: 'Разработка',
      //     alias: 'development',
      //   })
      //   .then(function (response) {
      //     console.log(response);
      //     if (response.status !== 200) throw new Error(`Ошибка HTTP: ${response.status}`);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      const response1 = await http.get('/categories');
      console.log(response1);

      const response = await http.get<User>(BASE_ROUTES.user);
      if (response.status !== 200) throw new Error(`Ошибка HTTP: ${response.status}`);

      userData.value = response.data;
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
