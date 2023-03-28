<template>
  <div>
    <a-button type="primary" @click="visible = !visible">Primary Button</a-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import { getUser } from '@/api/common'

const visible = ref(true)
onMounted(async () => {
  // console.log('123')
  // const data = await getUser()
  // console.log(data)
})
</script>

<style scoped>
.red {
  width: 100px;
  height: 100px;
  background: red;
}
</style>
