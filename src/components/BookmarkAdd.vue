<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useBookmarkStore } from '@/stores/bookmark.store';
import { useCategoryStore } from '@/stores/category.store';

import IconPlus from '@/icons/IconPlus.vue';
import ActionButton from './ActionButton.vue';
import AppInput from './AppInput.vue';
import AppButton from './AppButton.vue';

import { validator } from '@/utils/validator';

const btnSize = 48;
const isEdited = ref<boolean>(false);
const form = reactive({
  url: '',
  title: '',
  description: '',
  image: null as File | null,
});
const fileInput = ref<HTMLInputElement>();
const bookmarkStore = useBookmarkStore();
const categoryStore = useCategoryStore();

const isValidForm = computed(() => {
  return validator.text(form.url) && validator.text(form.title);
});

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    form.image = target.files[0];
  }
}

function triggerFileInput() {
  fileInput.value?.click();
}

function handleAddClick() {
  isEdited.value = true;
}
async function submitForm() {
  if (!isValidForm.value) return;

  try {
    const categoryId = categoryStore.categoryId;
    const formData = new FormData();
    formData.append('url', form.url);
    formData.append('title', form.title);
    formData.append('description', form.description);

    if (form.image) {
      formData.append('image', form.image);
    }

    await bookmarkStore.createBookmark(categoryId, formData);

    form.url = '';
    form.title = '';
    form.description = '';
    form.image = null;
    if (fileInput.value) {
      fileInput.value.value = '';
    }
    isEdited.value = false;
  } catch (error) {
    console.error('Create failed:', error);
  }
}
</script>

<template>
  <div class="bookmark-add">
    <ActionButton
      @click="handleAddClick"
      :size="btnSize"
      title="Добавить закладку"
      v-if="!isEdited"
    >
      <IconPlus />
    </ActionButton>

    <form class="bookmark-add__form" @submit.prevent="submitForm" v-else>
      <AppInput
        class="input--small"
        placeholder="Введите ссылку"
        v-model="form.url"
        type="text"
        :autofocus="true"
      />
      <AppInput
        class="input--small"
        placeholder="Введите название"
        v-model="form.title"
        type="text"
        required
      />
      <AppInput
        class="input--small"
        placeholder="Введите описание"
        v-model="form.description"
        type="text"
      />
      <!-- Поле для загрузки файла -->
      <div class="file-upload">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleFileSelect"
          style="display: none"
        />
        <button type="button" @click="triggerFileInput" class="file-upload__button">
          {{ form.image ? form.image.name : 'Выберите изображение' }}
        </button>
      </div>

      <AppButton :disabled="!isValidForm || bookmarkStore.isLoading">
        {{ bookmarkStore.isLoading ? 'Загрузка' : 'Сохранить' }}
      </AppButton>
    </form>
  </div>
</template>

<style scoped>
.bookmark-add {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: 1px solid var(--color-fg);
  min-height: 360px;
}

.bookmark-add__form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  max-width: 250px;
}

.file-upload {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 100%;
}

.file-upload__button {
  width: 100%;
  cursor: pointer;
}

.file-preview {
  margin-top: 8px;
}

.preview-image {
  max-width: 100px;
  max-height: 100px;
  border-radius: 4px;
  object-fit: cover;
}
</style>
