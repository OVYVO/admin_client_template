import Request from './request'
import { AxiosResponse } from 'axios'
import type { RequestConfig } from './types'

export interface CResponse<T> {
  statusCode: number
  info: string
  data: T
}

interface CRequestConfig<T, R> extends RequestConfig<CResponse<R>> {
  data?: T
}

const request = new Request({
  baseURL: '',
  timeout: 1000 * 60 * 5,
  interceptors: {
    requestInterceptors: config => {
      console.log('实例请求拦截器')
      return config
    },
    responseInterceptors: (res: AxiosResponse) => {
      console.log('实例响应拦截器')
      return res
    }
  }
})

const CRequest = <D = any, T = any>(config: CRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<CResponse<T>>(config)
}
