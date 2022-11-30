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
    },
    children: [
      {
        path: '/home1',
        name: 'home1',
        visible: false,
        component: () => import('@/views/index.vue'),
        meta: {
          title: '首页1'
        }
      },
      {
        path: '/home2',
        name: 'home2',
        visible: false,
        component: () => import('@/views/index.vue'),
        meta: {
          title: '首页2'
        }
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    visible: false,
    component: () => import('@/views/product.vue'),
    meta: {
      title: '商品页',
      icon: 'WindowsOutlined'
    },
    children: [
      {
        path: '/product1',
        name: 'product1',
        visible: false,
        component: () => import('@/views/index.vue'),
        meta: {
          title: '商品页1'
        }
      }
    ]
  },
  {
    path: '/article',
    name: 'article',
    visible: false,
    component: () => import('@/views/product.vue'),
    meta: {
      title: '文章',
      icon: 'GithubOutlined'
    }
  }
]

export default basicRoutes
