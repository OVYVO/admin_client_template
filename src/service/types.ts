import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 自定义interceptor接口
export interface RequestInterceptors<T> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}
