import { Ref, WatchStopHandle, ComputedRef } from 'vue'
import { ref, watch } from 'vue'

/**
 * 防抖函数(多次触发只执行最后一次)
 * @param fn 回调函数
 * @param wait 延时ms 默认1s
 * @example
 * case: 普通使用
 *  const setSate = (d)=>{console.log(d)}
 *  const {run, cancel} = useDebounceFn(setSate,2000)
 *  run(1)
 *  run(2)
 *  run(3)
 *  delay 6s => console.log(3)
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
  return { run, cancel }
}

/**
 * 防抖修改目标值
 * @param watchFn  被监听函数/取值函数
 * @param wait 延时ms 默认1s
 * @example
 * case: 普通使用
 *  const watchVal = ref(0)
 *  const { state, watchStop, cancel } = useDebounceDate(watchVal)
 *  watchval.value = 1
 *  watchval.value = 2
 *  watchval.value = 3
 *  delay 3s => console.log(watchval) //3
 * case: 取消某次赋值
 *  watchval.value = 3
 *  cancel()
 *  delay 1s => console.log(watchval) //3
 * case: 中断监听
 *  watchStop()
 *  watchval.value = 5
 *  delay 1s => console.log(watchval) //3
 */

export interface useDebounceStateApi<T> {
  state: Ref<T>
  watchStop: WatchStopHandle
  cancel: () => void
}

export function useDebounceDate<T>(watchFn: (() => T) | Ref<T> | ComputedRef<T>, wait = 1000): useDebounceStateApi<T> {
  const state = typeof watchFn === 'function' ? (ref(watchFn()) as Ref<T>) : (ref(watchFn['value']) as Ref<T>)
  const { run: setState, cancel } = useDebounceFn((d: T) => (state.value = d), wait - 10)
  const watchStop = watch(watchFn, newVal => {
    setState(newVal)
  })
  return { state, watchStop, cancel }
}
