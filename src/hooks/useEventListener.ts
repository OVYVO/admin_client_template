import type { Ref } from 'vue'
import { ref, watch, unref } from 'vue'
import { useDebounceFn } from './useDebounce'
import { useThrottleFn } from './useThrottle'

/**
 * 绑定监听事件
 * @param el Dom元素默认window
 * @param name 事件名称
 * @param listenerHandler 事件监听处理
 * @param options 参数
 * @param autoRemove 是否自动移除监听
 * @param needExtrahandle 是否需要额外处理监听处理事件
 * @param isDebounce 是否防抖
 * @param wait 时间
 */

export type RemoveEventFn = () => void

export interface useEventParams {
  el?: Element | Ref<Element | undefined> | Window | any
  name: string
  listenerHandler: EventListener
  options: boolean | AddEventListenerOptions
  autoRemove?: boolean
  needExtrahandle?: boolean
  isDebounce?: boolean
  wait?: number
}

export function useEventListener({
  el = window,
  name,
  listenerHandler,
  options,
  autoRemove = true,
  needExtrahandle = true,
  isDebounce = true,
  wait = 500
}: useEventParams): {
  removeEvent: RemoveEventFn
} {
  let remove: RemoveEventFn = () => {}
  const isAddRef = ref(false)
  if (el) {
    const element = ref(el as Element) as Ref<Element>
    const { run } =
      needExtrahandle && isDebounce ? useDebounceFn(listenerHandler, wait) : useThrottleFn(listenerHandler, wait)
    const handler = needExtrahandle ? run : listenerHandler
    // 添加监听
    const addEventListener = (e: Element) => {
      e.addEventListener(name, handler, options)
    }
    // 取消监听
    const removeEventListener = (e: Element) => {
      e.removeEventListener(name, handler, options)
    }
    const watchStop = watch(
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
      watchStop()
    }
  }
  return { removeEvent: remove }
}
