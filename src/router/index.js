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

const isAdmin = () => Axios('/users/me/');

router.beforeEach((to, from, next) => {
  // document title
  document.title = to.matched.some(record => record.meta.title) ? to.meta.title : '';
  // route navigation guards
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // if not connected
    if (!localStorage.getItem('token')) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    } else {
      if (to.matched.some(record => record.meta.visibility === 'admin_only')) {
        isAdmin()
          .then(({ data }) => {
            if (data[0].id === 1) next();
            else next({name: 'dashboard.index'});
          })
          .catch(() => next({name: 'dashboard.index'}));
      }
      else next();
    }
  }

  else next();
});

export default router;
