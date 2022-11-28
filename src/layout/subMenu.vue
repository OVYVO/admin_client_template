<template>
  <a-sub-menu :key="menuInfo.path">
    <div>{{ menuInfo }}</div>
    <template #icon><a-icon v-if="menuInfo.meta?.icon" :type="menuInfo.meta?.icon"></a-icon></template>
    <template #title>{{ menuInfo.name }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.path" @click="menuItemClick(item)">
          {{ item.name }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :key="item.path" :menu-info="item" @menuItemClick="menuItemClick(item)"></sub-menu>
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts" name="SubMenu">
import { RouteRecordRaw } from 'vue-router'

defineProps<{ menuInfo: RouteRecordRaw }>()

const emit = defineEmits(['menuItemClick'])

const menuItemClick = (item: any) => {
  emit('menuItemClick', item)
}
</script>

<style lang="less" scoped></style>
