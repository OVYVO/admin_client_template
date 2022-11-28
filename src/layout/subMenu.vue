<template>
  <a-sub-menu :key="menuInfo.key">
    <template #icon><a-icon :type="menuInfo.icon"></a-icon></template>
    <template #title>{{ menuInfo.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key" @click="menuItemClick(item)">
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :key="item.key" :menu-info="item" @menuItemClick="menuItemClick(item)"></sub-menu>
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts" name="SubMenu">
interface MenuInfo {
  key: string
  title: string
  path?: string
  icon?: string
  children?: MenuInfo[]
}

defineProps<{
  menuInfo: MenuInfo
}>()

const emit = defineEmits(['menuItemClick'])

const menuItemClick = (item: MenuInfo) => {
  emit('menuItemClick', item)
}
</script>

<style lang="less" scoped></style>
