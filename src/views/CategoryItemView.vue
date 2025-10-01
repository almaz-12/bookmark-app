<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ROUTE_NAMES } from '@/common/constants';
import CategoryHeader from '@/components/CategoryHeader.vue';
import type { Category } from '@/interfaces/category.interfaces';
import { useBookmarkStore } from '@/stores/bookmark.store';
import { useCategoryStore } from '@/stores/category.store';
import BookmarkCard from '@/components/BookmarkCard.vue';
import BookmarkList from '@/components/BookmarkList.vue';

const category = ref<Category>();
const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();
const bookmarkStore = useBookmarkStore();

async function loadCategoryData() {
  if (categoryStore.categories.length === 0) {
    await categoryStore.fetchCategories();
  }

  category.value = categoryStore.getCategoryByAlias(route.params.alias);
  if (category.value) {
    await bookmarkStore.fetchBookmarks(category.value.id);
  }
}

watch(
  () => route.params.alias,
  () => {
    loadCategoryData();
  },
);

async function changeCategory(newName: string) {
  if (!category.value || !newName.trim()) return;

  try {
    // TODO: Реализовать обновление категории в store
    console.log('Изменение категории:', category.value.id, 'на', newName);
    // await categoryStore.updateCategory(category.value.id, { name: newName });
    // category.value.name = newName; // Обновляем локальное значение
  } catch (error) {
    console.error('Ошибка изменения категории:', error);
  }
}
async function deleteCategory() {
  if (!category.value) return;

  if (!confirm(`Вы уверены, что хотите удалить категорию "${category.value.name}"?`)) {
    return;
  }

  try {
    await categoryStore.deleteCategory(category.value.id);
    router.replace({
      name: ROUTE_NAMES.MAIN,
    });
  } catch (error) {
    console.error('Ошибка удаления категории:', error);
    alert('Не удалось удалить категорию');
  }
}

onMounted(() => {
  loadCategoryData();
});
</script>

<template>
  <div v-if="categoryStore.isLoading" class="loading">Загрузка...</div>
  <div v-else-if="categoryStore.errorMessage" class="error">
    {{ categoryStore.errorMessage }}
  </div>
  <div v-else-if="category">
    <CategoryHeader
      :name="category.name"
      @change-category="changeCategory"
      @delete-category="deleteCategory"
    />

    <BookmarkList v-if="bookmarkStore.bookmarks" :data="bookmarkStore.bookmarks" />
  </div>

  <div v-else class="not-found">
    <p>Категория не найдена</p>
    <button @click="router.push({ name: ROUTE_NAMES.MAIN })">Вернуться на главную</button>
  </div>
</template>

<style scoped>
.loading,
.error,
.not-found {
  text-align: center;
  padding: 40px 20px;
}
</style>
