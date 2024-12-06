import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/introduction',
    },
    {
      path: '/introduction',
      component: () => import('./views/Introduction.vue'),
    },
    {
      path: '/choose-level',
      component: () => import('./views/ChooseLevel.vue'),
    },
    {
      path: '/quiz-process',
      component: () => import('./views/QuizProcess.vue'),
    },
    {
      path: '/quiz-result',
      component: () => import('./views/QuizResult.vue'),
    },
  ],
});

export default router;
