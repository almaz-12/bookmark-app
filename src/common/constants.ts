import axios from 'axios';

export const API_BASE = 'http://localhost:3000/api';
export const BASE_ROUTES = {
  user: `/user`,
  categories: `/categories`,
  boolmarks: `/bookmarks`,
};

export const http = axios.create({
  baseURL: API_BASE,
});

export const ROUTE_NAMES = {
  AUTH: 'auth',
  MAIN: 'main',
};
