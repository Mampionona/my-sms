import Vue from 'vue';
import Router from 'vue-router';
import * as auth from '@/api/auth';
import store from '@/store';
import routes from '@/router/routes';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const body = document.body;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('layout/setLayout', auth.isLoggedIn() ? to.meta.layout : 'default-layout');
    if (!auth.isLoggedIn()) {
      body.classList.add('bg-default');
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    } else {
      body.classList.remove('bg-default');
      next();
    }
  } else {
    body.classList.add('bg-default');
    store.dispatch('layout/setLayout', 'default-layout');
    next();
  }
});

export default router;
