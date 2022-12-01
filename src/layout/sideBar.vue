<template>
  <div class="sidebar-container">
    <a-layout-sider width="256" :collapsed="collapsed">
      <div class="menu-header" :class="[collapsed ? 'menu-header-collapsed' : '']">
        <div class="icon"></div>
        <span>Ryan Admin</span>
      </div>
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
                v-if="item.meta?.visible ?? true"
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
  </div>
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

const props = withDefaults(defineProps<Props>(), {
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
.sidebar-container {
  height: 100%;
  &:deep(.ant-layout-sider) {
    height: 100%;
    .menu-header {
      height: 60px;
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.25);
      white-space: initial;
      padding-left: 24px;
      transition: padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
      .icon {
        width: 40px;
        height: 40px;
        display: inline-block;
        background-image: url('../images/R_blue.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        flex: none;
      }
      span {
        flex: auto;
        min-width: 0;
        font-size: 24px;
        color: #fff;
        user-select: none;
        margin-left: 10px;
        overflow: hidden;
        transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), margin 0.3s, color 0.3s;
        opacity: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }
    }
    .menu-header-collapsed {
      padding: 0 calc(50% - 34px / 2);
      .icon {
        width: 34px;
        height: 34px;
      }
      span {
        opacity: 0;
      }
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
          line-height: 40px;
        }
        .ant-menu-title-content {
          opacity: 0;
        }
      }
    }
  }
}
</style>
