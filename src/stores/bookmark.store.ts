import { BASE_ROUTES, http } from '@/common/constants';
import type { Bookmark } from '@/interfaces/bookmark.interfaces';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBookmarkStore = defineStore('bookmark', () => {
  const bookmarks = ref<Bookmark[]>();
  const errorMessage = ref('');
  const isLoading = ref(false);

  async function fetchBookmarks(category_id: number) {
    try {
      errorMessage.value = '';
      isLoading.value = true;

      const response = await http.get<Bookmark[]>(`${BASE_ROUTES.bookmarks}/${category_id}`);
      if (response.status !== 200) throw new Error(`Ошибка HTTP: ${response.status}`);

      bookmarks.value = response.data;
    } catch (error) {
      errorMessage.value = 'Не удалось загрузить данные';
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function createBookmark(category_id: number) {
    try {
      errorMessage.value = '';
      isLoading.value = true;

      const response = await http.post<Bookmark>(`${BASE_ROUTES.bookmarks}/${category_id}`, {
        url: 'https://github.com',
        title: 'GitHub',
        description: 'Code hosting platform',
        image: 'https://avatars.githubusercontent.com/u/28588751?v=4',
      });
      if (response.status >= 300) throw new Error(`Ошибка HTTP: ${response.status}`);

      bookmarks.value?.push(response.data);
    } catch (error) {
      errorMessage.value = 'Не удалось создать закладку';
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteBookmark(id: number) {
    try {
      errorMessage.value = '';
      isLoading.value = true;

      const response = await http.delete(`${BASE_ROUTES.bookmarks}/${id}`);
      if (response.status >= 300) throw new Error(`Ошибка HTTP: ${response.status}`);
      bookmarks.value = bookmarks.value?.filter((b) => b.id !== id);
    } catch (error) {
      errorMessage.value = 'Не удалось удалить закладку';
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return { bookmarks, fetchBookmarks, createBookmark, deleteBookmark };
});
