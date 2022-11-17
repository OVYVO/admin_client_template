import { ref } from 'vue'

/**
 * 防抖
 * @param fn 回调函数
 * @param wait 延时ms
 */
export interface useDebounceFnApi {
  run: (...arg: any) => void
  cancel: () => void
}

export function useDebounceFn<T extends (...args: any) => any>(fn: T, wait = 1000): useDebounceFnApi {
  const timer = ref<any>()
  const cancel = () => {
    timer.value && clearTimeout(timer.value)
  }
  const run = (...args: any) => {
    cancel()
    timer.value = setTimeout(() => fn.apply(fn, args), wait)
  }
  return {
    run,
    cancel
  }
}
