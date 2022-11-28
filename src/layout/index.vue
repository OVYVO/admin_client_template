<template>
  <div class="layout-container">
    <a-layout>
      <side-bar
        :menuList="menuList"
        :collapsed="collapsed"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        @menuItemClick="menuItemClick"></side-bar>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
          Content
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { ref, reactive } from 'vue'
import SideBar from './sideBar.vue'

interface MenuItem {
  key: string
  title: string
  children?: MenuItem[]
  [x: string]: any
}

const menuList = reactive<MenuItem[]>([
  {
    title: 'Option',
    key: 'option',
    icon: '<SettingOutlined />',
    children: [
      {
        title: 'option1',
        key: 'o1'
      },
      {
        title: 'option2',
        key: 'o2'
      }
    ]
  },
  {
    title: 'User',
    key: 'user',
    children: [
      {
        title: 'user1',
        key: 'user1'
      },
      {
        title: 'user2',
        key: 'user1',
        children: [
          {
            title: 'user3',
            key: 'user3'
          }
        ]
      }
    ]
  },
  {
    title: 'Team',
    key: 'team'
  }
])

const openKeys = ref<string[]>(['option', 'user'])

const selectedKeys = ref<string[]>(['option'])

const title = ref<string>('')

const collapsed = ref<boolean>(true)

const menuItemClick = (item: MenuItem) => {
  title.value = item.title
}
</script>

<style lang="less" scoped>
.layout-container {
  width: 100%;
  height: 100%;
  &:deep(.ant-layout) {
    width: 100%;
    height: 100%;
    .logo {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: 80px;
      background: red;
      background-clip: content-box;
    }
  }
}
</style>
