<template>
  <page-layout>
    <router-view></router-view>
  </page-layout>
</template>
<script lang="ts" setup>
import PageLayout from '@/layout/index.vue'
</script>

<style lang="less">
html,
body {
  padding: 0;
  margin: 0;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
