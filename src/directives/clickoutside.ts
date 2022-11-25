/**
 * v-clickoutside
 * 点击dom外部
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */

import type { Directive, DirectiveBinding } from 'vue'

const clickoutside: Directive = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    document.addEventListener(
      'click',
      (e: any) => {
        el.contains(e.target) && binding.value()
      },
      false
    )
  },
  unmounted() {
    document.removeEventListener('click', () => {})
  }
}

export default clickoutside
