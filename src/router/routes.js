
const routes = [
  {
    path: '/frams',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/frams', component: () => import('pages/home/Index.vue') },
      { path: '/exchange', component: () => import('pages/trade/Swap.vue') },
      { path: '/liquidity', component: () => import('pages/trade/Pool.vue') },
      { path: '/farms', component: () => import('pages/farms/Index.vue') },
      { path: '/nests', component: () => import('pages/nests/Index.vue') }
    ]
  },

  {
    path: '/ido1',
    component: () => import('layouts/IDOLayout.vue'),
    children: [
      { path: '/ido1', component: () => import('pages/ido/Index.vue') },
      { path: '/ido1:contract', component: () => import('pages/ido/Index.vue') },
      { path: '/ido1/detail', component: () => import('pages/ido/Detail.vue') }
    ]
  },

  { 
    path: '/invite', 
    component: () => import('pages/ido2/Invite.vue') 
  },
  
  {
    path: '/',
    component: () => import('pages/ido2/Layout.vue'),
    children: [
      { path: '/', component: () => import('pages/ido2/Index.vue') },
      { path: '/buy', component: () => import('pages/ido2/Buy.vue') },
      { path: '/:contract', component: () => import('pages/ido2/Index.vue') }
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
