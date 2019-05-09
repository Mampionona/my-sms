const dashboardMetas = {
  requiresAuth: true,
  layout: 'dashboard'
};

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      title: 'Connexion',
      redirectIfLoggedIn: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/AutoConnect'),
    meta: { redirectIfLoggedIn: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: {
      title: 'Inscription',
      redirectIfLoggedIn: true
    }
  },
  {
    path: '/password',
    name: 'password',
    component: () => import('@/views/Password'),
    meta: {
      title: 'Mot de passe oublié ?',
      redirectIfLoggedIn: true
    }
  },
  {
    path: '/payment-result',
    name: 'payment_result',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Payment/Result')
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
        name: 'dashboard',
        meta: {
          ...dashboardMetas,
          title: 'Tableau de bord',
          breadcrumb: 'Tableau de bord',
          icon: 'ni ni-shop'
        },
        component: () => import('@/views/dashboard/Index')
      },
      // Base de contacts
      {
        path: 'lists',
        name: 'contacts_list',
        meta: {
          ...dashboardMetas,
          title: 'Liste des contacts',
          breadcrumb: 'Liste des contacts',
          icon: 'fas fa-address-book'
        },
        component: () => import('@/views/dashboard/Lists')
      },
      {
        path: 'lists/:listId([0-9]+)',
        name: 'contacts',
        meta: {
          ...dashboardMetas,
          title: 'Contacts',
          breadcrumb: 'Contacts',
          icon: 'fas fa-address-book'
        },
        component: () => import('@/views/dashboard/Contacts')
      },
      {
        path: 'import/file',
        name: 'import_file',
        meta: {
          ...dashboardMetas,
          title: 'Importer des contacts',
          breadcrumb: 'Importer des contacts',
          icon: 'fas fa-address-book'
        },
        component: () => import('@/views/dashboard/ImportContacts')
      },
      {
        path: 'message/redaction',
        name: 'create_campaign',
        meta: {
          ...dashboardMetas,
          title: 'Créer une campagne',
          breadcrumb: 'Créer une campagne',
          icon: 'fa fa-th-large'
        },
        component: () => import('@/views/dashboard/message/Redaction')
      },
      {
        path: 'message/list/drafts',
        name: 'drafts_messages',
        meta: {
          ...dashboardMetas,
          title: 'Brouillons',
          breadcrumb: 'Brouillons',
          icon: 'fa fa-th-large'
        },
        component: () => import('@/views/dashboard/message/Drafts')
      },
      {
        path: 'message/list',
        name: 'sent_messages',
        meta: {
          ...dashboardMetas,
          title: 'Envois effectués',
          breadcrumb: 'Envois effectués',
          icon: 'ni ni-send'
        },
        component: () => import('@/views/dashboard/message/List')
      },
      {
        path: 'message/list/scheduled',
        name: 'scheduled_messages',
        meta: {
          ...dashboardMetas,
          title: 'Envois planifiés',
          breadcrumb: 'Envois planifiés',
          icon: 'ni ni-send'
        },
        component: () => import('@/views/dashboard/message/Scheduled')
      },
      {
        path: 'packs',
        name: 'packs',
        meta: {
          ...dashboardMetas,
          title: 'Acheter des SMS',
          breadcrumb: 'Sélectionner votre pack de sms',
          icon: 'ni ni-credit-card'
        },
        component: () => import('@/views/dashboard/Packs')
      },
      {
        path: 'inbox',
        name: 'inbox',
        meta: {
          ...dashboardMetas,
          title: 'Boîte de réception',
          breadcrumb: 'Boîte de réception',
          icon: 'fas fa-inbox'
        },
        component: () => import('@/views/dashboard/message/Inbox')
      },
      {
        path: 'inbox/:messageId([0-9]+)/answers',
        name: 'answers',
        meta: {
          ...dashboardMetas,
          title: 'Réponses',
          breadcrumb: 'Réponses',
          icon: 'fas fa-inbox'
        },
        component: () => import('@/views/dashboard/message/Answers')
      },
      {
        path: 'profile',
        name: 'profile',
        meta: {
          ...dashboardMetas,
          title: 'Profil',
          breadcrumb: 'Profil'
        },
        component: () => import('@/views/dashboard/Profile')
      },
      {
        path: 'users',
        name: 'users',
        meta: {
          ...dashboardMetas,
          visibility: 'admin_only',
          title: 'Utilisateurs',
          breadcrumb: 'Utilisateurs',
          icon: 'fas fa-users-cog'
        },
        component: () => import('@/views/dashboard/Users')
      },
      {
        path: 'payments',
        name: 'payments',
        meta: {
          ...dashboardMetas,
          visibility: 'admin_only',
          title: 'Paiements effectués',
          breadcrumb: 'Paiements effectués',
          icon: 'fas fa-users-cog'
        },
        component: () => import('@/views/dashboard/Payments')
      },
      {
        path: 'plans',
        name: 'plans',
        meta: {
          ...dashboardMetas,
          visibility: 'admin_only',
          title: 'Plans',
          breadcrumb: 'Plans',
          icon: 'fas fa-users-cog'
        },
        component: () => import('@/views/dashboard/Plans')
      },
      {
        path: 'stats',
        name: 'stats',
        meta: {
          ...dashboardMetas,
          title: 'Statistiques',
          breadcrumb: 'Statistiques',
          icon: 'fas fa-chart-bar'
        },
        component: () => import('@/views/dashboard/Stats')
      }
    ]
  }, {
    path: '*',
    name: 'not_found',
    meta: {
      title: '404 - Page introuvable'
    },
    component: () => import('@/views/404')
  }
];

export default routes;
