export default [
  {
    path: '/',
    name: '首页',
    // component: () => import('@/views/index.vue'),
    meta: {
      icon: 'AppleOutlined'
    },
    children: [
      {
        path: '/1',
        name: '首页1'
      }
    ]
  }
]
