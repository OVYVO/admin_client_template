import type { Directive, DirectiveBinding } from 'vue'
interface ElType extends HTMLElement {
  src: string
  $data_src: string
  $io: IntersectionObserver
}

const lazyimg: Directive = {
  beforeMount(el: ElType, binding: DirectiveBinding) {
    el.$data_src = binding.value
  },
  mounted(el: ElType) {
    const io = new IntersectionObserver(entries => {
      const realSrc = el.$data_src
      entries[0].isIntersecting && realSrc && (el.src = realSrc)
    })
    el.$io = io
    io.observe(el)
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.$data_src = binding.value
  },
  unmounted(el: ElType) {
    el.$io.disconnect()
  }
}
export default lazyimg
