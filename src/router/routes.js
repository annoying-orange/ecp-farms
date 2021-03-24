
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home/Index.vue') },
      { path: '/exchange', component: () => import('pages/trade/Swap.vue') },
      { path: '/liquidity', component: () => import('pages/trade/Pool.vue') },
      { path: '/farms', component: () => import('pages/farms/Index.vue') },
      { path: '/nests', component: () => import('pages/nests/Index.vue') }
    ]
  },

  {
    path: '/ido',
    component: () => import('layouts/IDOLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ido/Index.vue') },
      { path: '/ido/invite', component: () => import('pages/ido/Invite.vue') },
      { path: '/ido/detail', component: () => import('pages/ido/Detail.vue') }
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
