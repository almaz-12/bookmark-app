import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { ROUTE_NAMES } from '@/common/constants';
import { useUserStore } from '@/stores/user.store';
import { useAuthStore } from '@/stores/auth.store';

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

const publicRoutes = [ROUTE_NAMES.AUTH];

router.beforeEach(async (to, from, next) => {
  const isPublicRoute = publicRoutes.includes(to.name);

  // если сразу на страницу авторизации
  if (isPublicRoute) {
    next();
    return;
  }

  const authStore = useAuthStore();
  const token = authStore.getToken;
  if (!token) {
    next({
      name: ROUTE_NAMES.AUTH,
    });
    return;
  }
  next();
  return;
});

export default router;
