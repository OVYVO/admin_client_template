<template>
  <a-layout-sider :collapsed="collapsed">
    <div class="logo"></div>
    <a-menu
      :selectedKeys="selectedKeys"
      @update:selectedKeys="updateSelectedKeys"
      theme="dark"
      mode="inline"
      :openKeys="openKeys"
      @update:openKeys="updateOpenKeys">
      <template v-for="item in menuList" :key="item.key">
        <template v-if="!item.children">
          <router-link :to="item.path">
            <a-menu-item :key="item.path" @click="menuItemClick(item)">
              <template #icon>
                <a-icon :type="item.meta?.icon"></a-icon>
              </template>
              {{ item.meta.title }}
            </a-menu-item>
          </router-link>
        </template>
        <template v-else>
          <sub-menu :key="item.path" :menu-info="item" @menuItemClick="menuItemClick"></sub-menu>
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

<style lang="less" scoped>
.ant-layout-sider {
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
}
</style>
