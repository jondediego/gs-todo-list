import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TodoView from '../views/TodoView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/active',
    name: 'todoActive',
    component: TodoView,
    meta: { completeFilter: false },
  },
  {
    path: '/completed',
    name: 'todoCompleted',
    component: TodoView,
    meta: { completeFilter: true },
  },
  {
    path: '/',
    name: 'todoAll',
    component: TodoView,
    meta: { completeFilter: null },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
