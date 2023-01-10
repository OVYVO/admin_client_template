/**
 * v-draggable
 * 移动元素
 * 需要优化
 */
import type { Directive } from 'vue'
const draggable: Directive = {
  mounted(el: HTMLElement) {
    // 设置目标元素基础属性
    el.style.cursor = 'move'
    el.style.position = 'fixed'

    // 监听鼠标在目标元素上按下
    el.addEventListener('mousedown', (e: any) => {
      const { width, height } = el.getBoundingClientRect()
      // 当前目标元素的left与top
      const left = el.offsetLeft
      const top = el.offsetTop
      // 保存按下的鼠标的X与Y
      const mouseX = e.clientX
      const mouseY = e.clientY

      // 监听鼠标移动
      document.onmousemove = e => {
        // 鼠标移动的距离
        const disX = e.clientX - mouseX
        const disY = e.clientY - mouseY

        el.style.left = left + disX + 'px'
        el.style.top = top + disY + 'px'
        return false // 防止选中文本，文本拖动的问题
      }

      // 监听鼠标抬起
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    })
  }
}

export default draggable
