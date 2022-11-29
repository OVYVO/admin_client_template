import { RouteRecordRaw } from 'vue-router'
export default <RouteRecordRaw[]>[
  {
    path: '/',
    name: '首页',
    a: '',
    component: () => import('@/views/index.vue'),
    meta: {
      visible: true,
      icon: 'AppleOutlined'
    }
  },
  {
    path: '/product',
    name: '商品',
    component: () => import('@/views/product.vue'),
    meta: {
      visible: false,
      icon: 'WindowsOutlined'
    }
  }
]
