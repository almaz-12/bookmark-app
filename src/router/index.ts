import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { ROUTE_NAMES } from '@/common/constants';
import { useUserStore } from '@/stores/user.store';

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

  try {
    const store = useUserStore();
    await store.fetchUser();
    next();
    return;
  } catch (error) {
    next({
      name: ROUTE_NAMES.AUTH,
    });
    return;
  }
});

export default router;
