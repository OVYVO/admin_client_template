import type { AppRouteRecordRaw } from '../types'
const basicRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index.vue'),
    redirect: '/home1',
    meta: {
      title: '首页',
      icon: 'AppleOutlined'
    },
    children: [
      {
        path: '/home1',
        name: 'home1',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '首页1'
        },
        children: [
          {
            path: '/home1/edit',
            name: 'edit',
            component: () => import('@/views/index.vue'),
            meta: {
              title: '首页1-1'
            },
            children: [
              {
                path: '/home1/edit/1',
                name: 'edit1',
                component: () => import('@/views/index.vue'),
                meta: {
                  title: '首页1-1',
                  visible: false
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/product.vue'),
    meta: {
      title: '商品页',
      icon: 'WindowsOutlined'
    },
    children: [
      {
        path: '/product1',
        name: 'product1',
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
    component: () => import('@/views/product.vue'),
    meta: {
      title: '文章',
      icon: 'GithubOutlined',
      visible: false
    }
  }
]

export default basicRoutes
