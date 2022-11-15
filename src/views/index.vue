<template>
  <div>哈哈</div>
</template>

<script setup lang="ts">
import request from '@/service/index'
import { onMounted } from 'vue'

onMounted(() => {
  const d = request({
    url: '/api/v1',
    method: 'post'
  })
  console.log(d)
})
</script>

<style scoped></style>
