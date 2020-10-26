
const routes = [
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    meta:{auth: true}, 
    children: [
      { path: '', component: () => import('pages/Index.vue'), meta:{user: true} },
      { path: '/dashboard/admin', component: () => import('pages/Admin.vue'), meta:{adminUser: true}  },
      { path: '/settings', component: () => import('pages/Settings.vue'), meta:{isLoggedIn: true} },
    ]
  },
  {
    path: '',
    component: () => import('layouts/Layout.vue'),
    meta:{auth: false},
    children: [
      { path: '', component: () => import('pages/Login.vue'), meta:{noAuth: true}, },
      { path: '/signup', component: () => import('pages/Signup.vue'), meta:{noAuth: true}, },
      { path: '/resetpassword/:id', component: () => import('pages/resetpassword.vue'), meta:{noAuth: true}, },
      { path: '/forgotpassword', component: () => import('pages/forgotpassword.vue'), meta:{noAuth: true}, },
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
