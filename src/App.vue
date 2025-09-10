<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UserProfile from './components/UserProfile.vue';
import { BASE_ROUTES } from './common/constants';
import type { User } from './interfaces/user';

const userName = ref<User>();
const errorMessage = ref('');
const isLoading = ref(false);

const fetchData = async () => {
  try {
    errorMessage.value = '';
    isLoading.value = true;

    const response = await fetch(BASE_ROUTES.user);

    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

    const data = (await response.json()) as User;
    console.log(data);
    userName.value = data;

    return data;
  } catch (error) {
    errorMessage.value = 'Не удалось загрузить данные';
    throw error;
  } finally {
    isLoading.value = false;
  }
};

async function getUser() {
  await fetchData();
}

onMounted(() => {
  getUser();
});
</script>

<template>
  <div class="app">
    <div class="wrap">
      <div v-if="isLoading">Загрузка...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
      <div class="app__main" v-else>
        <nav class="nav">
          <UserProfile v-if="userName" :name="userName.name" />
        </nav>
        <main>контент</main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}
.wrap {
  max-width: 1450px;
  padding: 140px 15px 50px;
  margin: 0 auto;
}
.app__main {
  display: flex;
}
.nav {
  max-width: 300px;
  width: 100%;
}
</style>
