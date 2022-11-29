import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { AppRouteRecordRaw } from './types'

const routes: AppRouteRecordRaw[] = []

const routerContext: any = import.meta.glob('./modules/**/*.ts', { eager: true })
Object.keys(routerContext).forEach(item => {
  const mod = routerContext[item].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routes.push(...modList)
})

const router = createRouter({
  history: createWebHistory(),
  routes: routes as unknown as RouteRecordRaw[]
})

// router.beforeEach((to, from, next) => {
//   console.log('路由去向', to)
//   console.log('路由来源', from)
//   next()
// })

export default router
