<template>
  <a-layout-header>
    <div class="header-left">
      <a-icon :type="collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" class="trigger" @click="updateCollapsed()">
      </a-icon>
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in routerTree" :key="item.key">
          <span v-if="index === routerTree.length - 1">
            {{ item.title }}
          </span>
          <router-link v-else :to="item.key">
            {{ item.title }}
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="header-right">
      <a-dropdown>
        <div class="avatar">
          <a-avatar :size="30">
            <template #icon><a-icon type="UserOutlined"></a-icon></template>
          </a-avatar>
          <span class="role-name">Ryan</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a-icon type="HomeOutlined" style="margin-right: 6px"></a-icon>
              <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-item>
              <a-icon type="LogoutOutlined" style="margin-right: 6px"></a-icon>
              <a href="javascript:;">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { routerTreeType } from './types'

const props = withDefaults(
  defineProps<{
    collapsed: boolean
    routerTree: routerTreeType[]
  }>(),
  {
    collapsed: false
  }
)

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
}>()

const updateCollapsed = () => {
  emit('update:collapsed', !props.collapsed)
}
</script>

<style lang="less" scoped>
.ant-layout-header {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-left {
    display: flex;
    .ant-breadcrumb {
      margin-left: 20px;
    }
    .anticon {
      font-size: 20px;
    }
  }
  .header-right {
    .avatar {
      box-sizing: border-box;
      padding: 0 5px;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      .role-name {
        user-select: none;
        font-size: 14px;
        font-weight: 700;
        margin-left: 6px;
      }
    }
  }
}
</style>
