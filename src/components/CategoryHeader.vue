<script setup lang="ts">
import IconEdit from '@/icons/IconEdit.vue';
import ActionButton from './ActionButton.vue';
import IconDelete from '@/icons/IconDelete.vue';

const props = defineProps<{ name: string }>();
const emits = defineEmits(['edit-category', 'delete-category']);

async function handleEditClick() {
  emits('edit-category');
}
async function handleDeleteClick() {
  emits('delete-category');
}
</script>

<template>
  <div class="category-header">
    <h2 class="category-header__name">
      {{ props.name }}
    </h2>
    <div class="category-header__btns">
      <ActionButton @click="handleDeleteClick">
        <IconDelete />
      </ActionButton>
      <ActionButton @click="handleEditClick">
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

.category-header__btns {
  display: flex;
  gap: 10px;
}
</style>
