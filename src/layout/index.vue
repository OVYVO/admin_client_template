<template>
  <div class="layout-container">
    <a-layout>
      <side-bar
        :menuList="routerList"
        :collapsed="collapsed"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        @menuItemClick="menuItemClick"></side-bar>
      <a-layout>
        <a-layout-header>
          <a-icon
            :type="collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'"
            class="trigger"
            @click="() => (collapsed = !collapsed)">
          </a-icon>
        </a-layout-header>
        <a-layout-content>
          <slot></slot>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import SideBar from './sideBar.vue'

const router = useRouter()

const routerList: any = computed<RouteRecordRaw[]>(() => {
  return router.options.routes as RouteRecordRaw[]
})
console.log(routerList)

const openKeys = ref<string[]>(['option', 'user'])

const selectedKeys = ref<string[]>(['option'])

const title = ref<string | symbol>('')

const collapsed = ref<boolean>(false)

const menuItemClick = (item: RouteRecordRaw) => {
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
    .ant-layout-header {
      padding: 0 20px;
      background: #fff;
      .anticon {
        font-size: 20px;
      }
    }
    .ant-layout-content {
      box-sizing: border-box;
      padding: 10px;
      background: #fff;
      background-clip: content-box;
    }
  }
}
</style>