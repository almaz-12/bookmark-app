<script setup lang="ts">
import IconEdit from '@/icons/IconEdit.vue';
import IconOk from '@/icons/IconOk.vue';
import ActionButton from './ActionButton.vue';
import IconDelete from '@/icons/IconDelete.vue';
import AppInput from '@/components/AppInput.vue';
import { ref } from 'vue';
import IconLogout from '@/icons/IconLogout.vue';

const props = defineProps<{ name: string }>();
const editedName = ref<string>(props.name);
const emits = defineEmits(['delete-category', 'change-category']);
const isEditCategory = ref(false);

function handleSaveClick() {
  if (editedName.value.trim() && editedName.value !== props.name) {
    console.log(editedName.value);
    emits('change-category', editedName.value);
  }
  isEditCategory.value = false;
}
function handleDeleteClick() {
  emits('delete-category');
}
function handleEditClick() {
  isEditCategory.value = true;
  editedName.value = props.name;
}
function handleCancelEdit() {
  isEditCategory.value = false;
  editedName.value = props.name;
}
</script>

<template>
  <div class="category-header">
    <h2 class="category-header__name" v-if="!isEditCategory">
      {{ props.name }}
    </h2>
    <div class="category-header__edit" v-else>
      <AppInput
        v-model="editedName"
        :placeholder="props.name"
        class="category-header__input"
        type="text"
        required
      />
      <ActionButton @click="handleSaveClick" title="Сохранить">
        <IconOk />
      </ActionButton>
      <ActionButton @click="handleCancelEdit" title="Отменить"> <IconLogout /> </ActionButton>
    </div>

    <div class="category-header__btns">
      <ActionButton @click="handleDeleteClick" title="Удалить категорию">
        <IconDelete />
      </ActionButton>
      <ActionButton
        @click="isEditCategory ? handleCancelEdit() : handleEditClick()"
        :title="isEditCategory ? 'Отменить редактирование' : 'Редактировать категорию'"
      >
        <IconEdit />
      </ActionButton>
    </div>
  </div>
</template>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.category-header__name {
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 2%;
}

.category-header__edit,
.category-header__btns {
  display: flex;
  gap: 10px;
}
.category-header__edit {
  max-width: 320px;
}
.category-header__input {
  width: calc(100% - 84px);
}
</style>
