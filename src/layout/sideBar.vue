<template>
  <a-layout-sider :collapsed="collapsed" collapsible>
    <a-menu
      :selectedKeys="selectedKeys"
      @update:selectedKeys="updateSelectedKeys"
      theme="dark"
      mode="inline"
      :openKeys="openKeys"
      @update:openKeys="updateOpenKeys">
      <template v-for="item in menuList" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key" @click="menuItemClick(item)">
            <template #icon>
              <a-icon type="PieChartOutlined"></a-icon>
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :key="item.key" :menu-info="item" @menuItemClick="menuItemClick"></sub-menu>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import SubMenu from './subMenu.vue'
import { SettingOutlined } from '@ant-design/icons-vue'

interface MenuItem {
  key: string
  title: string
  path?: string
  icon?: string
  children?: MenuItem[]
}

interface Props {
  menuList: Array<MenuItem>
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

const menuItemClick = (item: MenuItem) => {
  emit('menuItemClick', item)
}
</script>

<style lang="less" scoped></style>
