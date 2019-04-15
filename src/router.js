import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import * as auth from './api/auth';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/dashboard',
      component: () => import('./views/Dashboard.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          name: 'dashboard.index',
          meta: {
            requiresAuth: true,
            layout: 'connected'
          },
          component: () => import('./views/dashboard/Index.vue')
        },
        // Base de contacts
        {
          path: 'lists',
          name: 'lists',
          meta: {
            requiresAuth: true,
            layout: 'connected'
          },
          component: () => import('./views/dashboard/Lists.vue')
        },
        {
          path: 'lists/:listId([0-9]+)',
          name: 'contacts',
          meta: {
            requiresAuth: true,
            layout: 'connected'
          },
          component: () => import('./views/dashboard/Contacts.vue')
        },
        {
          path: 'lists/importer',
          name: 'list.import',
          meta: {
            requiresAuth: true,
            layout: 'connected'
          },
          component: () => import('./views/dashboard/ImportContacts.vue')
        }
      ]
    }, {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
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
    next(); // make sure to always call next()!
  }
});

export default router;
