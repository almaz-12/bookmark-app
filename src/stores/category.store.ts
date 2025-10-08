import {
  BASE_ROUTES,
  CREATE_ERROR_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  DELETE_ERROR_MESSAGE,
  UPDATE_ERROR_MESSAGE,
  http,
} from '@/common/constants';
import type { Category } from '@/interfaces/category.interfaces';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import router from '@/router';

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([]);
  const categoryId = ref<number>(1);
  const errorMessage = ref('');
  const isLoading = ref(false);

  async function fetchCategories() {
    try {
      clearLoading();

      const response = await http.get<Category[]>(BASE_ROUTES.categories);
      if (response.status !== 200) throw new Error(`Ошибка HTTP: ${response.status}`);

      categories.value = response.data;
    } catch (error) {
      handleError(DEFAULT_ERROR_MESSAGE, error);
    } finally {
      isLoading.value = false;
    }
  }

  async function createCategory() {
    try {
      clearLoading();

      const alias = uuidv4();

      const response = await http.post<Category>(BASE_ROUTES.categories, {
        name: 'Новая категория',
        alias: alias,
      });
      if (response.status >= 300) throw new Error(`Ошибка HTTP: ${response.status}`);

      categories.value?.push(response.data);
      router.push(`${BASE_ROUTES.category}/${alias}`);
    } catch (error) {
      handleError(CREATE_ERROR_MESSAGE, error);
    } finally {
      isLoading.value = false;
    }
  }

  function getCategoryByAlias(alias: string | string[]): Category | undefined {
    const searchAlias = Array.isArray(alias) ? alias[0] : alias;
    console.log(categories.value);
    return categories.value?.find((c) => c.alias === searchAlias);
  }

  async function deleteCategory(id: number) {
    try {
      clearLoading();

      const response = await http.delete(`${BASE_ROUTES.categories}/${id}`);
      console.log(response);
      if (response.status >= 300) throw new Error(`Ошибка HTTP: ${response.status}`);
      categories.value = categories.value?.filter((c) => c.id !== id);
    } catch (error) {
      handleError(DELETE_ERROR_MESSAGE, error);
    } finally {
      isLoading.value = false;
    }
  }

  async function updateCategory(id: number, newName: string) {
    try {
      clearLoading();

      const response = await http.put(`${BASE_ROUTES.categories}/${id}`, {
        name: newName,
      });
      if (response.status >= 300) throw new Error(`Ошибка HTTP: ${response.status}`);
      categories.value = categories.value?.map((c) => (c.id === id ? { ...c, name: newName } : c));
    } catch (error) {
      handleError(UPDATE_ERROR_MESSAGE, error);
    } finally {
      isLoading.value = false;
    }
  }

  function clearLoading() {
    errorMessage.value = '';
    isLoading.value = true;
  }
  function handleError(message: string, error: unknown) {
    errorMessage.value = message;
    throw error;
  }
  function setCategoryId(id: number) {
    categoryId.value = id;
  }

  return {
    isLoading,
    errorMessage,
    categories,
    categoryId,
    setCategoryId,
    fetchCategories,
    createCategory,
    getCategoryByAlias,
    deleteCategory,
    updateCategory,
  };
});
