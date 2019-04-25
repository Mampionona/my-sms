const dashboard_metas = {
  requiresAuth: true,
  layout: 'dashboard'
};

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      title: 'Connexion'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: {
      title: 'Inscription'
    }
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard'),
    meta: {
      breadcrumb: 'Tableau de bord'
    },
    children: [
      {
        path: '/',
        name: 'dashboard.index',
        meta: {
          ...dashboard_metas,
          title: 'Tableau de bord',
          breadcrumb: 'Tableau de bord'
        },
        component: () => import('@/views/dashboard/Index')
      },
      // Base de contacts
      {
        path: 'lists',
        name: 'lists',
        meta: {
          ...dashboard_metas,
          title: 'Liste des contacts',
          breadcrumb: 'Liste des contacts',
        },
        component: () => import('@/views/dashboard/Lists')
      },
      {
        path: 'lists/:listId([0-9]+)',
        name: 'contacts',
        meta: {
          ...dashboard_metas,
          title: 'Contacts',
          breadcrumb: 'Contacts',
        },
        component: () => import('@/views/dashboard/Contacts')
      },
      {
        path: 'lists/importer',
        name: 'list.import',
        meta: {
          ...dashboard_metas,
          title: 'Importer des contacts',
          breadcrumb: 'Importer des contacts',
        },
        component: () => import('@/views/dashboard/ImportContacts')
      },
      {
        path: 'message/redaction',
        name: 'message.redaction',
        meta: {
          ...dashboard_metas,
          title: 'Créer une campagne',
          breadcrumb: 'Créer une campagne',
        },
        component: () => import('@/views/dashboard/message/Redaction')
      },
      {
        path: 'message/drafts',
        name: 'message.drafts',
        meta: {
          ...dashboard_metas,
          title: 'Brouillons',
          breadcrumb: 'Brouillons',
        },
        component: () => import('@/views/dashboard/message/Drafts')
      },
      {
        path: 'message/list',
        name: 'message.list',
        meta: {
          ...dashboard_metas,
          title: 'Envois effectués',
          breadcrumb: 'Envois effectués',
        },
        component: () => import('@/views/dashboard/message/List')
      },
      {
        path: 'message/scheduled',
        name: 'message.scheduled',
        meta: {
          ...dashboard_metas,
          title: 'Envois planifiés',
          breadcrumb: 'Envois planifiés'
        },
        component: () => import('@/views/dashboard/message/Scheduled')
      },
      {
        path: 'packs',
        name: 'packs',
        meta: {
          ...dashboard_metas,
          title: 'Acheter des SMS',
          breadcrumb: 'Acheter des SMS',
        },
        component: () => import('@/views/dashboard/Packs')
      },
      {
        path: 'inbox',
        name: 'inbox',
        meta: {
          ...dashboard_metas,
          title: 'Boîte de réception',
          breadcrumb: 'Boîte de réception'
        },
        component: () => import('@/views/dashboard/message/Inbox')
      },
      {
        path: 'inbox/:messageId([0-9]+)/answers',
        name: 'answers',
        meta: {
          ...dashboard_metas,
          title: 'Réponses',
          breadcrumb: 'Réponses',
        },
        component: () => import('@/views/dashboard/message/Answers')
      },
      {
        path: 'profile',
        name: 'profile',
        meta: {
          ...dashboard_metas,
          title: 'Profil',
          breadcrumb: 'Profil'
        },
        component: () => import('@/views/dashboard/Profile')
      }
    ]
  }, {
    path: '*',
    name: '404',
    meta: {
      title: '404 - Page introuvable'
    },
    component: () => import('@/views/404')
  }
];

export default routes;
