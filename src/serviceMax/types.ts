import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ResponseType<T = any> {
  // 视项目情况改变
  data: null | T
  err: AxiosError | null
  reponse: AxiosResponse | null
}

export interface RequestConfig extends AxiosRequestConfig {
  args?: Record<string, any>
}

export interface RequestType {
  // 定义一个函数接收config参数，返回一个接收requestConfig参数返回Promise的回调函数
  <Payload = any>(config: RequestConfig): (requestConfig?: Partial<RequestConfig>) => Promise<ResponseType<Payload>>

  <Payload, Data>(config: RequestConfig): (
    requestConfig?: Partial<Omit<RequestConfig, 'data'>> & { data: Data }
  ) => Promise<ResponseType<Payload>>

  <Payload, Data, Params>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data' | 'params'>> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) & { params: Params }
  ) => Promise<ResponseType<Payload>>

  <Payload, Data, Params, Args>(config: RequestConfig): (
    requestConfig: Partial<Omit<RequestConfig, 'data' | 'params' | 'args'>> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) &
      (Params extends undefined ? { params?: undefined } : { params: Params }) & {
        args: Args
      }
  ) => Promise<ResponseType<Payload>>
}
