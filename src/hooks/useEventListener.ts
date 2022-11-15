import type { Ref } from 'vue'
import { ref, watch, unref } from 'vue'

export type RemoveEventFn = () => void

export interface useEventParams {
  el?: Element | Ref<Element | undefined> | Window | any
  name: string
  listener: EventListener
  options: boolean | AddEventListenerOptions
  autoRemove?: boolean
}

export function useEventListener({ el = window, name, listener, options, autoRemove = true }: useEventParams): {
  removeEvent: RemoveEventFn
} {
  let remove: RemoveEventFn = () => {}
  const isAddRef = ref(false)
  if (el) {
    const element = ref(el as Element) as Ref<Element>
    const removeEventListener = (e: Element) => {
      e.removeEventListener(name, listener, options)
    }
    const addEventListener = (e: Element) => {
      e.addEventListener(name, listener, options)
    }
    const removeWatch = watch(
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
      removeWatch()
    }
  }
  return { removeEvent: remove }
}
