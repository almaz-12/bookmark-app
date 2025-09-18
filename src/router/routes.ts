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
    name: ROUTE_NAMES.MAIN,
    children: [
      {
        path: 'films',
        name: 'films',
        component: () => import('@/views/CategoryView.vue'),
      },
      {
        path: 'learn',
        name: 'learn',
        component: () => import('@/views/CategoryView.vue'),
      },
      {
        path: 'development',
        name: 'development',
        component: () => import('@/views/CategoryView.vue'),
      },
    ],
  },
];
