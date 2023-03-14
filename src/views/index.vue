<template>
  <div>
    <a-button type="primary" @click="visible = !visible">Primary Button</a-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import '../mock/index.ts'

const visible = ref(true)
onMounted(() => {
  console.log('123')
  axios
    .get(`/api/getUsers`)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
})
</script>

<style scoped>
.red {
  width: 100px;
  height: 100px;
  background: red;
}
</style>
