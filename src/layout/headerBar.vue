<template>
  <a-layout-header>
    <a-icon :type="collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" class="trigger" @click="updateCollapsed()">
    </a-icon>
  </a-layout-header>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    collapsed: boolean
  }>(),
  {
    collapsed: false
  }
)
// 以下两种形式的类型标注都是可行的 前者为运行时声明 后者为类型声明
// const emit = defineEmits(['update:collapsed'])
const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
}>()

const updateCollapsed = () => {
  emit('update:collapsed', !props.collapsed)
}
</script>

<style lang="less" scoped>
.ant-layout-header {
  padding: 0 20px;
  background: #fff;
  .anticon {
    font-size: 20px;
  }
}
</style>
