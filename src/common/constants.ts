import { useAuthStore } from '@/stores/auth.store';
import axios from 'axios';

export const BASE_HOST = 'http://localhost:3000';
export const API_BASE = `${BASE_HOST}/api`;
export const BASE_ROUTES = {
  user: `/user`,
  categories: `/categories`,
  category: `/category`,
  bookmarks: `/bookmarks`,
  auth: {
    login: `/login`,
  },
};

export const http = axios.create({
  baseURL: API_BASE,
});

http.interceptors.request.use((config) => {
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
export const DELETE_ERROR_MESSAGE = 'Ошибка удаления категории';
export const CREATE_ERROR_MESSAGE = 'Ошибка создания категории';
export const UPDATE_ERROR_MESSAGE = 'Ошибка обновления категории';

export const SORT_OPTIONS = [
  { sortField: 'created_at', label: 'По дате' },
  { sortField: 'title', label: 'По названию' },
];

export const SORT_OPTION_DEFAULT = 'created_at';
