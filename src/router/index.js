import Vue from 'vue';
import Router from 'vue-router';
import * as auth from '@/api/auth';
import routes from '@/router/routes';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // document title
  document.title = to.matched.some(record => record.meta.title) ? to.meta.title : '';
  // route navigation guards
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isLoggedIn()) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
