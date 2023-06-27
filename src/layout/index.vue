<template>
  <div class="layout-container">
    <a-layout>
      <side-bar
        :menuList="routerList"
        :collapsed="collapsed"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        @menuItemClick="menuItemClick">
      </side-bar>
      <a-layout>
        <header-bar v-model:collapsed="collapsed" :routerTree="routerTree"></header-bar>
        <a-layout-content>
          <Transition name="fade" mode="out-in">
            <slot></slot>
          </Transition>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { ComputedRef } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { AppRouteRecordRaw } from '@/router/types'
import type { routerTreeType } from './types'

import SideBar from './sideBar.vue'
import HeaderBar from './headerBar.vue'

const router = useRouter()
const route = useRoute()

const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>(['home1'])
const collapsed = ref<boolean>(false)
const title = ref<string | symbol>('')
const routerTree = ref<routerTreeType[]>([])

watch(
  () => route.matched,
  val => {
    const handleRouterTree: Array<routerTreeType> = val.length
      ? val
          .map(item => {
            return {
              key: item.path,
              name: item.name as string,
              title: item?.meta?.title as string,
              visible: (item.meta?.visible ?? true) as boolean
            }
          })
          .filter(it => it.visible)
      : []
    if (handleRouterTree.length) {
      routerTree.value = handleRouterTree
      openKeys.value = handleRouterTree.map(it => it.name)
      selectedKeys.value = [handleRouterTree[handleRouterTree.length - 1].name]
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const routerList: ComputedRef<AppRouteRecordRaw[]> = computed(() => {
  return filterRoute(router.options.routes as unknown as AppRouteRecordRaw[])
})

const filterRoute = (routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] => {
  routes.forEach((item: AppRouteRecordRaw, index: number) => {
    if (!(item.meta?.visible ?? true)) {
      routes.splice(index, 1)
    }
    if (item.children && item.children.length) {
      filterRoute(item.children)
    }
    if (!item?.children?.length) {
      delete item['children']
    }
  })
  return routes
}

const menuItemClick = (item: AppRouteRecordRaw) => {
  title.value = item.name ? item.name : ''
}
</script>

<style lang="less" scoped>
.layout-container {
  width: 100%;
  height: 100%;
  &:deep(.ant-layout) {
    width: 100%;
    height: 100%;
    .ant-layout-content {
      box-sizing: border-box;
      padding: 10px;
      background-clip: content-box;
      .fade-leave-active,
      .fade-enter-active {
        transition: all 0.5s ease;
      }
      .fade-enter-from {
        opacity: 0;
        transform: translateX(-30px);
      }
      .fade-leave-to {
        opacity: 0;
        transform: translateX(30px);
      }
    }
  }
}
</style>
