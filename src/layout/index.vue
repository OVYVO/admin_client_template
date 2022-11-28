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
        <a-layout-header>
          <!--展开折叠按钮-->
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
    icon: 'PieChartOutlined',
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
    key: 'team',
    icon: 'AppleOutlined'
  }
])

const openKeys = ref<string[]>(['option', 'user'])

const selectedKeys = ref<string[]>(['option'])

const title = ref<string>('')

const collapsed = ref<boolean>(false)

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
