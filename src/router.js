import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import * as auth from './api/auth';
import store from '@/store';

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
      component: () => import('./views/Login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register')
    },
    {
      path: '/dashboard',
      component: () => import('./views/Dashboard'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          name: 'dashboard.index',
          meta: {
            requiresAuth: true,
            layout: 'dashboard-layout'
          },
          component: () => import('./views/dashboard/Index')
        },
        // Base de contacts
        {
          path: 'lists',
          name: 'lists',
          meta: {
            requiresAuth: true,
            layout: 'dashboard-layout'
          },
          component: () => import('./views/dashboard/Lists')
        },
        {
          path: 'lists/:listId([0-9]+)',
          name: 'contacts',
          meta: {
            requiresAuth: true,
            layout: 'dashboard-layout'
          },
          component: () => import('./views/dashboard/Contacts')
        },
        {
          path: 'lists/importer',
          name: 'list.import',
          meta: {
            requiresAuth: true,
            layout: 'dashboard-layout'
          },
          component: () => import('./views/dashboard/ImportContacts')
        },
        {
          path: 'message/redaction',
          name: 'message.redaction',
          meta: {
            requiresAuth: true,
            layout: 'dashboard-layout'
          },
          component: () => import('./views/dashboard/message/Redaction')
        },
        {
          path: 'message/drafts',
          name: 'message.drafts',
          meta: {
            requiresAuth: true,
            layout: 'dashboard-layout'
          },
          component: () => import('./views/dashboard/message/Drafts')
        },
        {
          path: 'message/list',
          name: 'message.list',
          meta: {
            requiresAuth: true,
            layout: 'dashboard-layout'
          },
          component: () => import('./views/dashboard/message/List')
        },
        {
          path: 'message/scheduled',
          name: 'message.scheduled',
          meta: {
            requiresAuth: true,
            layout: 'dashboard-layout'
          },
          component: () => import('./views/dashboard/message/Scheduled')
        },
        {
          path: 'packs',
          name: 'packs',
          meta: {
            requiresAuth: true,
            layout: 'dashboard-layout'
          },
          component: () => import('./views/dashboard/Packs')
        },
      ]
    }, {
      path: '*',
      name: '404',
      component: () => import('./views/404')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('layout/setLayout', auth.isLoggedIn() ? to.meta.layout : 'default-layout');
    if (!auth.isLoggedIn()) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    store.dispatch('layout/setLayout', 'default-layout');
    next();
  }
});

export default router;
