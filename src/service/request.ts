import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestInterceptors, RequestConfig } from './types'
export class Request {
  public instance: AxiosInstance
  public customInterceptorsObj: RequestInterceptors<AxiosResponse> | undefined

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.customInterceptorsObj = config?.interceptors
    // 类请求拦截器
    this.instance.interceptors.request.use(
      (req: AxiosRequestConfig) => {
        console.log(req)
        return req
      },
      (err: any) => {
        err
      }
    )
    // 实例请求拦截器
    this.instance.interceptors.request.use(
      this.customInterceptorsObj?.requestInterceptors,
      this.customInterceptorsObj?.requestInterceptorsCatch
    )
    // 实例响应拦截器
    this.instance.interceptors.response.use(
      this.customInterceptorsObj?.responseInterceptors,
      this.customInterceptorsObj?.responseInterceptorsCatch
    )
    // 类响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log(res)
        return res.data
      },
      (err: any) => {
        err
      }
    )
  }
  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 接口设置了请求拦截，使用接口拦截器
      if (config?.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          // 接口设置了响应拦截，使用接口拦截器
          if (config?.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }
}

export default Request
