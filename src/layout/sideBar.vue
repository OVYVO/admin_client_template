<template>
  <a-layout-sider width="256" :collapsed="collapsed">
    <div class="logo"></div>
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys="openKeys"
      mode="inline"
      theme="dark"
      width="256"
      @update:selectedKeys="updateSelectedKeys"
      @update:openKeys="updateOpenKeys">
      <template v-for="item in menuList" :key="item.key">
        <template v-if="!item.children">
          <router-link :to="item.path">
            <a-menu-item
              v-if="!item.meta.hasOwnProperty('visible') || item.meta.visible"
              :key="item.name"
              class="a-menu-item-a"
              @click="menuItemClick(item)">
              <template #icon>
                <a-icon :type="item.meta?.icon"></a-icon>
              </template>
              {{ item.meta.title }}
            </a-menu-item>
          </router-link>
        </template>
        <template v-else>
          <sub-menu :key="item.name" :menu-info="item" @menuItemClick="menuItemClick"></sub-menu>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import SubMenu from './subMenu.vue'
import type { AppRouteRecordRaw } from '@/router/types'

interface Props {
  menuList: Array<AppRouteRecordRaw>
  selectedKeys: string[]
  openKeys: string[]
  collapsed?: boolean
}

withDefaults(defineProps<Props>(), {
  collapsed: false
})

const emit = defineEmits(['menuItemClick', 'update:selectedKeys', 'update:openKeys'])

const updateSelectedKeys = (...res: string[][]) => {
  emit('update:selectedKeys', ...res)
}

const updateOpenKeys = (...res: string[][]) => {
  emit('update:openKeys', ...res)
}

const menuItemClick = (item: AppRouteRecordRaw) => {
  emit('menuItemClick', item)
}
</script>

<style lang="less" scoped></style>
