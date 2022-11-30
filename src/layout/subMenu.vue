<template>
  <a-sub-menu :key="menuInfo.name">
    <template #icon><a-icon v-if="menuInfo.meta?.icon" :type="menuInfo.meta?.icon"></a-icon></template>
    <template #title>{{ menuInfo.meta.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <router-link :to="item.path">
          <a-menu-item
            v-if="!item.meta.hasOwnProperty('visible') || item.meta.visible"
            :key="item.name"
            @click="menuItemClick(item)">
            {{ item.meta.title }}
          </a-menu-item>
        </router-link>
      </template>
      <template v-else>
        <sub-menu :key="item.name" :menu-info="item" @menuItemClick="menuItemClick(item)"></sub-menu>
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts" name="SubMenu">
import type { AppRouteRecordRaw } from '@/router/types'

defineProps<{ menuInfo: AppRouteRecordRaw }>()

const emit = defineEmits(['menuItemClick'])

const menuItemClick = (item: any) => {
  emit('menuItemClick', item)
}
</script>

<style lang="less" scoped></style>
