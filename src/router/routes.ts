import { ROUTE_NAMES } from '@/common/constants';

export const routes = [
  {
    path: '/auth',
    component: () => import('@/views/AuthView.vue'),
    name: ROUTE_NAMES.AUTH,
  },
  {
    path: '/',
    component: () => import('@/views/MainView.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.MAIN,
        component: () => import('@/views/CategoryIndexView.vue'),
      },
      {
        path: ':alias',
        component: () => import('@/views/CategoryView.vue'),
      },
    ],
  },
];
