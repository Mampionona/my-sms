import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/router/routes';
import Axios from 'axios';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
});
const ADMIN_ID = 1;
const isAuthenticated = () => !!localStorage.getItem('token');
const fetchUser = () => Axios('/users/me/');
const dashboard = {
  name: 'dashboard'
};

router.beforeEach((to, from, next) => {
  // document title
  document.title = to.matched.some(record => record.meta.title) ? to.meta.title : '';
  // route navigation guards
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // if not connected
    if (!isAuthenticated()) next({ name: 'login', query: { redirect: to.fullPath } });

    else if (to.matched.some(record => record.meta.visibility === 'admin_only')) {
      fetchUser()
        .then(({ data }) => {
          if (data[0].id === ADMIN_ID) next();
          else next(dashboard);
        })
        .catch(() => next(dashboard));
    }

    else if (to.name === 'payment_result') {
      if (to.query.paylinetoken) next();
      else next('/');
    }

    else next();
  }

  else if (to.matched.some(record => record.meta.redirectIfLoggedIn)) {
    // when user is logged in
    // redirect to /dashboard
    if (isAuthenticated()) next(dashboard);
    // continue navigation
    else next();
  }

  else next();
});

export default router;
