<script setup lang="ts">
import type { Bookmark } from '@/interfaces/bookmark.interfaces';
import IconDeleteWhite from '@/icons/IconDeleteWhite.vue';
import IconLogout from '@/icons/IconLogout.vue';
import ActionButton from './ActionButton.vue';
import PopupConfirm from './PopupConfirm.vue';
import { useBookmarkStore } from '@/stores/bookmark.store';
import { ref } from 'vue';

const props = defineProps<Bookmark>();
const btnSize = 48;
const bookmarkStore = useBookmarkStore();
const isPopupOpened = ref<boolean>(false);
const popupMessage = ref<string>('');

function openDeleteConfirm() {
  isPopupOpened.value = true;
  popupMessage.value = `Вы уверены, что хотите удалить закладку "${props.title}"?`;
}

function handleConfirmCancel() {
  isPopupOpened.value = false;
}

async function deleteBookmark() {
  isPopupOpened.value = false;

  if (!props.id) return;

  try {
    await bookmarkStore.deleteBookmark(props.id);
  } catch (error) {
    alert('Не удалось удалить категорию');
  }
}

function openLink() {
  window.open(props.url, '_blank');
}
</script>

<template>
  <div class="bookmark-card">
    <div class="bookmark-card__img" :style="{ 'background-image': `url(${props.image})` }"></div>
    <div class="bookmark-card__title">
      {{ props.title }}
    </div>
    <div class="bookmark-card__desc">
      {{ props.description }}
    </div>
    <div class="bookmark-card__actions">
      <ActionButton
        @click="openDeleteConfirm"
        class="action-btn--white"
        :size="btnSize"
        title="Удалить"
      >
        <IconDeleteWhite />
      </ActionButton>
      <ActionButton @click="openLink" class="action-btn--white" :size="btnSize" title="Открыть">
        <IconLogout />
      </ActionButton>
    </div>
  </div>
  <PopupConfirm
    :message="popupMessage"
    :is-opened="isPopupOpened"
    @ok="deleteBookmark"
    @cancel="handleConfirmCancel"
  />
</template>

<style scoped>
.bookmark-card {
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  padding: 20px;
  gap: 24px;
  box-shadow: 0px 10px 10px 0px rgba(245, 245, 247, 0.1);
  background: var(--color-fg);
}
.bookmark-card__img {
  height: 162px;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
}
.bookmark-card__actions {
  display: flex;
  justify-content: space-between;
}
.bookmark-card__desc,
.bookmark-card__title {
  font-weight: 500;
  font-size: 16px;
  color: var(--color-bg);
}
.bookmark-card__desc {
  font-weight: 400;
}
</style>
