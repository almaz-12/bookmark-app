import { BASE_ROUTES, http } from '@/common/constants';
import type { Category } from '@/interfaces/category.interfaces';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>();
  const errorMessage = ref('');
  const isLoading = ref(false);

  async function fetchCategories() {
    try {
      errorMessage.value = '';
      isLoading.value = true;

      const response = await http.get(BASE_ROUTES.categories);
      if (response.status !== 200) throw new Error(`Ошибка HTTP: ${response.status}`);

      categories.value = response.data;
    } catch (error) {
      errorMessage.value = 'Не удалось загрузить данные';
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function createCategory() {
    try {
      errorMessage.value = '';
      isLoading.value = true;

      const response = await http.post(BASE_ROUTES.categories, {
        name: 'Хобби',
        alias: uuidv4(),
      });
      if (response.status >= 300) throw new Error(`Ошибка HTTP: ${response.status}`);

      categories.value?.push(response.data);
    } catch (error) {
      errorMessage.value = 'Не удалось загрузить данные';
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return { categories, fetchCategories, createCategory };
});
