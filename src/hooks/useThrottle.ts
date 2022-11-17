import { ref, watch } from 'vue'
import type { Ref, WatchStopHandle, ComputedRef } from 'vue'

/**
 * 节流函数(时间段内只执行一次)
 * @param fn 回调函数
 * @param wait 延时ms 默认1s
 * @example
 * case: 普通使用
 *  const setSate = (d)=>{console.log(d)}
 *  const {run, cancel} = useThrottleFn(setSate,5)
 *  run(1)
 *  run(2)
 *  run(3)
 *  ....
 *  delay 5 => console.log(1)
 */
export interface useThrottleFnApi {
  run: (...args: any) => void
  cancel: () => void
}

export function useThrottleFn<T extends (...args: any) => void>(fn: T, wait = 1000) {
  const timer = ref<any>(null)
  const cleanTimer = () => {
    clearTimeout(timer.value)
    timer.value = null
  }
  const cancel = () => {
    timer.value && cleanTimer()
  }

  const run = (...args: any) => {
    if (timer.value) return
    timer.value = setTimeout(() => {
      cleanTimer()
      fn.apply(fn, args)
    }, wait)
  }

  return { run, cancel }
}

/**
 * 防抖修改目标值
 * @param watchFn 被监听函数/取值函数
 * @param wait 延时ms 默认1s
 * @example
 * const watchVal = ref(0)
 * const { state } = useThrottleDate(watchVal, 2)
 * watchval.value = 1
 * // dely 1
 * watchval.value = 2
 * watchval.value = 3
 * watchval.value = 4
 * // dely 1
 * console.log(state.value)
 * => 1
 */

export interface useThrottleStateApi<T> {
  state: Ref<T>
  setState: (...args: any) => void
  watchStop: WatchStopHandle
  cancel: () => void
}

export function useThrottleDate<T>(watchFn: (() => T) | Ref<T> | ComputedRef<T>, wait = 1000): useThrottleStateApi<T> {
  const state = typeof watchFn === 'function' ? (ref(watchFn()) as Ref<T>) : (ref(watchFn['value']) as Ref<T>)
  const { run: setState, cancel } = useThrottleFn((data: T) => {
    state.value = data
  }, wait - 100)
  const watchStop = watch(watchFn, newVal => {
    setState(newVal)
  })
  return {
    state,
    setState,
    watchStop,
    cancel
  }
}
