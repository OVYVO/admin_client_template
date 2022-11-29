import type { AppRouteRecordRaw } from '../types'
const basicRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    visible: false,
    component: () => import('@/views/index.vue'),
    meta: {
      title: '首页',
      icon: 'AppleOutlined'
    }
  },
  {
    path: '/product',
    name: 'product',
    visible: false,
    component: () => import('@/views/product.vue'),
    meta: {
      title: '商品页',
      icon: 'WindowsOutlined'
    }
  }
]

export default basicRoutes
