<template>
  <div>
    <a-button type="primary" @click="visible = !visible">Primary Button</a-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const visible = ref(true)
onMounted(() => {
  console.log('123')
})
</script>

<style scoped>
.red {
  width: 100px;
  height: 100px;
  background: red;
}
</style>
