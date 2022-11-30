import type { RouteRecordRaw } from 'vue-router'

export interface AppRouteMeta {
  title: string
  icon?: string
  visible?: boolean
}

// Omit在RouteRecordRaw剔除掉meta属性
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: AppRouteMeta
  children?: AppRouteRecordRaw[]
}
