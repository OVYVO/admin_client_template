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
        <header-bar v-model:collapsed="collapsed"></header-bar>
        <a-layout-content>
          <slot></slot>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import type { AppRouteRecordRaw } from '@/router/types'

import SideBar from './sideBar.vue'
import HeaderBar from './headerBar.vue'

const router = useRouter()

const routerList: ComputedRef<AppRouteRecordRaw[]> = computed(() => {
  return router.options.routes as unknown as AppRouteRecordRaw[]
})

const openKeys = ref<string[]>([])

const selectedKeys = ref<string[]>([])

const title = ref<string | symbol>('')

const collapsed = ref<boolean>(false)

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
      background: #fff;
      background-clip: content-box;
    }

    .ant-layout-sider {
      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.3);
        margin: 16px;
      }
      .ant-menu {
        a {
          color: rgba(0, 0, 0, 0.85);
        }
        & > a {
          .ant-menu-item {
            display: flex;
            white-space: initial;
            .ant-menu-title-content {
              flex: auto;
              min-width: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), margin 0.3s, color 0.3s;
            }
          }
        }
      }
      .ant-menu-inline-collapsed {
        .a-menu-item-a {
          padding: 0 calc(50% - 16px / 2);
          .ant-menu-item-icon {
            font-size: 16px;
            position: relative;
            line-height: 40px;
          }
          .ant-menu-title-content {
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>
