import { Component, createApp } from 'vue'
import Loading from './index.vue'

let timer: any, instance: any, unmount: () => void
function mountComponent(RootComponent: Component) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')
  root.className = 'loading'
  document.body.appendChild(root)
  return {
    instance: app.mount(root),
    unmount() {
      document.body.removeChild(root)
    }
  }
}
// 创建一个loading组件
export function showLoading(autoHidden = false) {
  ;({ instance, unmount } = mountComponent(Loading))
  if (autoHidden) {
    timer = setTimeout(() => {
      hiddenLoading()
      clearTimeout(timer)
    }, 3000)
  }
}
// 销毁loading组件
export function hiddenLoading() {
  instance && unmount()
}
