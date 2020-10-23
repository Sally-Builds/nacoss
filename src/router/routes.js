
const routes = [
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), meta:{user: true} },
      { path: '/dashboard/admin', component: () => import('pages/Admin.vue'), meta:{adminUser: true}  },
      { path: '/settings', component: () => import('pages/Settings.vue'), meta:{isLoggedIn: true} },
    ]
  },
  {
    path: '',
    component: () => import('layouts/Layout.vue'),
    meta:{noAuth: true},
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: '/signup', component: () => import('pages/Signup.vue') },
      { path: '/resetpassword/:id', component: () => import('pages/resetpassword.vue') },
      { path: '/forgotpassword', component: () => import('pages/forgotpassword.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
