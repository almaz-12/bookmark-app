<script setup lang="ts">
import IconPlus from '@/icons/IconPlus.vue';
import ActionButton from './ActionButton.vue';
import { computed, inject, reactive, ref } from 'vue';
import { useBookmarkStore } from '@/stores/bookmark.store';
import AppInput from './AppInput.vue';
import AppButton from './AppButton.vue';
import { validator } from '@/utils/validator';
import { CURRENT_CATEGORY_ID } from '@/common/constants';

const category_id = inject<string>(CURRENT_CATEGORY_ID);
const btnSize = 48;
const isEdited = ref<boolean>(false);
const form = reactive({
  url: '',
  title: '',
  description: '',
  image: '',
});
const bookmarkStore = useBookmarkStore();

const isValidForm = computed(() => {
  return validator.text(form.image) && validator.text(form.title);
});

function handleAddClick() {
  isEdited.value = true;
}
async function submitForm() {
  if (!isValidForm.value) return;

  if (typeof category_id !== 'string') {
    console.error('category_id is not a number:', category_id);
    return;
  }

  try {
    console.log(category_id, form.url, form.title, form.description, form.image);
    // await bookmarkStore.createBookmark(
    //   category_id,
    //   form.url,
    //   form.title,
    //   form.description,
    //   form.image,
    // );
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
      <AppInput
        class="input--small"
        placeholder="Ссылка на картинку"
        v-model="form.image"
        type="password"
        required
      />
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
</style>
