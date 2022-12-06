import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestType, RequestConfig, ResponseType } from './types'

const instance: AxiosInstance = axios.create({
  baseURL: ''
})

instance.interceptors.request.use(
  (req: RequestConfig) => {
    const { url, args } = req
    if (args) {
      const lostParams: string[] = []
      // url! 表示强制排除undefined以及null的情况
      const replacedUrl = url!.replace(/\{([^}]+)\}/g, (res, arg: string) => {
        if (!args[arg]) {
          lostParams.push(arg)
        }
        return args[arg] as string
      })
      if (lostParams.length) {
        return Promise.reject(new Error('在args中找不到对应的路径参数'))
      }
      return { ...req, url: replacedUrl }
    }
    return req
  },
  (err: any) => {
    return err
  }
)
instance.interceptors.response.use()

const request: RequestType = <T>(config: RequestConfig) => {
  return async (requestConfig?: Partial<RequestConfig>) => {
    const mergedConfig = {
      ...config,
      ...requestConfig,
      Headers: {
        ...config.headers,
        ...requestConfig?.headers
      }
    }
    try {
      const response: AxiosResponse<T, RequestConfig> = await instance.request<T>(mergedConfig)
      const { data } = response
      return { err: null, data, response } as unknown as ResponseType<T>
    } catch (err: any) {
      return { err, data: null, response: null } as unknown as ResponseType<T>
    }
  }
}

export default request
