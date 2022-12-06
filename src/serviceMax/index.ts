import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestType, RequestConfig, ResponseType } from './types'

const instance: AxiosInstance = axios.create({
  baseURL: '',
  // 添加默认默认header
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

instance.interceptors.request.use(
  (req: RequestConfig) => {
    const { url, args } = req
    if (args) {
      const lostParams: string[] = []
      // url! 表示强制排除undefined以及null的情况
      const replacedUrl = url!.replace(/\{([^}]+)\}/g, (res, arg: string) => {
        !args[arg] && lostParams.push(arg)
        return args[arg] as string
      })
      if (lostParams.length) return Promise.reject(new Error('在args中找不到对应的路径参数'))
      return { ...req, url: replacedUrl }
    }
    return req
  },
  (err: any) => {
    return err
  }
)
instance.interceptors.response
  .use
  // (res: AxiosResponse) => {
  //   const { errCode, code } = res.data
  //   if (errCode == 1) {
  //     return Promise.reject(res)
  //   } else if (errCode == 0 || code == 0) {
  //     return res
  //   } else {
  //     return Promise.reject('请求失败')
  //   }
  // },
  // (err: any) => {
  //   return err
  // }
  ()

const request: RequestType = <T>(config: RequestConfig) => {
  return async (requestConfig?: Partial<RequestConfig>) => {
    const mergedConfig = {
      ...config,
      ...requestConfig,
      headers: {
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

// use
//import makeRequest from '../request';
// export default {
//   '/admins': makeRequest<{ admins: string[] }>({
//     url: '/admins',
//   }),
//   '/delay': makeRequest({
//     url: '/delay',
//   }),
//   '/500-error': makeRequest({
//     url: '/500-error',
//   }),
//   '/account/{username}': makeRequest<
//     { id: string; name: string; role: string },
//     undefined,
//     undefined,
//     { username: string }
//   >({
//     url: '/account/{username}',
//   }),
// };

// import apis from './api';
// const getAdmins = async () => {
//   const { err, data } = await apis['/admins']();
//   if (err) return;
//   setAdmins(data!.admins);
// };
