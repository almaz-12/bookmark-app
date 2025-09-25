import { useAuthStore } from '@/stores/auth.store';
import axios from 'axios';

export const API_BASE = 'http://localhost:3000/api';
export const BASE_ROUTES = {
  user: `/user`,
  categories: `/categories`,
  boolmarks: `/bookmarks`,
  auth: {
    login: `/login`,
  },
};

export const http = axios.create({
  baseURL: API_BASE,
});

http.interceptors.request.use((config) => {
  // Используем хранилище внутри интерцептора, когда он вызывается
  const authStore = useAuthStore();
  const token = authStore.getToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const ROUTE_NAMES = {
  AUTH: 'auth',
  MAIN: 'main',
};

export const TOKEN_KEY = 'token-store';

export const DEFAULT_ERROR_MESSAGE = 'Не удалось загрузить данные';
export const DELETE_ERROR_MESSAGE = 'Ошибка удаления';
export const CREATE_ERROR_MESSAGE = 'Ошибка создания';
