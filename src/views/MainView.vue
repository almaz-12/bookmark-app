<script setup lang="ts">
import CategoryList from '../components/CategoryList.vue';
import CreateButton from '../components/CreateButton.vue';
import UserProfile from '../components/UserProfile.vue';
import IconPlus from '../icons/IconPlus.vue';
import { useCategoryStore } from '../stores/category.store';

const store = useCategoryStore();
</script>

<template>
  <div class="wrap">
    <div class="wrap__main">
      <nav class="nav">
        <UserProfile />
        <CategoryList />
        <CreateButton @click="store.createCategory()">
          <IconPlus />
        </CreateButton>
      </nav>
      <main class="main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  max-width: 1450px;
  padding: 140px 15px 50px;
  margin: 0 auto;
  min-height: 100vh;
}
.wrap__main {
  display: flex;
}
.nav {
  max-width: 300px;
  width: 100%;
}
.main {
  flex-grow: 2;
}
</style>
