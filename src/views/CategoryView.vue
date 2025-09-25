<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ROUTE_NAMES } from '@/common/constants';
import CategoryHeader from '@/components/CategoryHeader.vue';
import type { Category } from '@/interfaces/category.interfaces';
import { useBookmarkStore } from '@/stores/bookmark.store';
import { useCategoryStore } from '@/stores/category.store';

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

async function editCategory() {}
async function deleteCategory() {
  if (!category.value) return;
  try {
    await categoryStore.deleteCategory(category.value.id);
    router.push({
      name: ROUTE_NAMES.MAIN,
    });
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  loadCategoryData();
});
</script>

<template>
  <div v-if="categoryStore.isLoading">Загрузка...</div>
  <div v-else-if="categoryStore.errorMessage" class="error">
    {{ categoryStore.errorMessage }}
  </div>
  <div v-else>
    <CategoryHeader
      v-if="category"
      :name="category.name"
      @edit-category="editCategory"
      @delete-category="deleteCategory"
    />
  </div>
</template>

<style scoped></style>
