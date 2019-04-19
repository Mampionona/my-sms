const dashboard_metas = {
  requiresAuth: true,
  layout: 'dashboard'
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register')
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard'),
    children: [
      {
        path: '/',
        name: 'dashboard.index',
        meta: { ...dashboard_metas },
        component: () => import('@/views/dashboard/Index')
      },
      // Base de contacts
      {
        path: 'lists',
        name: 'lists',
        meta: { ...dashboard_metas },
        component: () => import('@/views/dashboard/Lists')
      },
      {
        path: 'lists/:listId([0-9]+)',
        name: 'contacts',
        meta: { ...dashboard_metas },
        component: () => import('@/views/dashboard/Contacts')
      },
      {
        path: 'lists/importer',
        name: 'list.import',
        meta: { ...dashboard_metas },
        component: () => import('@/views/dashboard/ImportContacts')
      },
      {
        path: 'message/redaction',
        name: 'message.redaction',
        meta: { ...dashboard_metas },
        component: () => import('@/views/dashboard/message/Redaction')
      },
      {
        path: 'message/drafts',
        name: 'message.drafts',
        meta: { ...dashboard_metas },
        component: () => import('@/views/dashboard/message/Drafts')
      },
      {
        path: 'message/list',
        name: 'message.list',
        meta: { ...dashboard_metas },
        component: () => import('@/views/dashboard/message/List')
      },
      {
        path: 'message/scheduled',
        name: 'message.scheduled',
        meta: { ...dashboard_metas },
        component: () => import('@/views/dashboard/message/Scheduled')
      },
      {
        path: 'packs',
        name: 'packs',
        meta: { ...dashboard_metas },
        component: () => import('@/views/dashboard/Packs')
      },
      {
        path: 'inbox',
        name: 'inbox',
        meta: { ...dashboard_metas },
        component: () => import('@/views/dashboard/message/Inbox')
      },
      {
        path: 'inbox/:messageId([0-9]+)/receipt',
        name: 'replies',
        meta: { ...dashboard_metas },
        component: () => import('@/views/dashboard/message/Detail')
      },
    ]
  }, {
    path: '*',
    name: '404',
    component: () => import('@/views/404')
  }
];

export default routes;
