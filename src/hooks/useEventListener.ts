import type { Ref } from 'vue'
import { ref, watch, unref } from 'vue'

export type RemoveEventFn = () => void

export interface useEventParams {
  el?: Element | Ref<Element | undefined> | Window | any
  name: string
  listenerHandler: EventListener
  options: boolean | AddEventListenerOptions
  autoRemove?: boolean
}

export function useEventListener({ el = window, name, listenerHandler, options, autoRemove = true }: useEventParams): {
  removeEvent: RemoveEventFn
} {
  let remove: RemoveEventFn = () => {}
  const isAddRef = ref(false)
  if (el) {
    const element = ref(el as Element) as Ref<Element>
    const addEventListener = (e: Element) => {
      e.addEventListener(name, listenerHandler, options)
    }
    const removeEventListener = (e: Element) => {
      e.removeEventListener(name, listenerHandler, options)
    }
    watch(
      element,
      (v, _ov, cleanUp) => {
        if (v) {
          !unref(isAddRef) && addEventListener(v)
          cleanUp(() => {
            autoRemove && removeEventListener(v)
          })
        }
      },
      {
        immediate: true
      }
    )
    remove = () => {
      removeEventListener(element.value)
    }
  }
  return { removeEvent: remove }
}
