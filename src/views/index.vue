<template>
  <div>
    <div class="red" ref="redDom" v-if="visible"></div>
    <a-button type="primary" @click="visible = !visible">Primary Button</a-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEventListener } from '@/hooks/useEventListener'

const redDom = ref(null)
const visible = ref(true)
onMounted(() => {
  const a = useEventListener({
    el: redDom,
    name: 'click',
    listenerHandler: () => {
      console.log(1)
    },
    options: false,
    autoRemove: false
  })
  // a.removeEvent()
})
</script>

<style scoped>
.red {
  width: 100px;
  height: 100px;
  background: red;
}
</style>
