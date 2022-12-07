import { notification } from 'ant-design-vue'
import { AxiosError, AxiosResponse } from 'axios'
import type { RequestConfig, ResponseDataType } from './types'

export const interceptorRequestHandler = {
  onFulfilled: (req: RequestConfig) => {
    const { url, args } = req
    if (!url) return Promise.reject(new Error('url不能为空'))
    if (args) {
      // url! 表示强制排除undefined以及null的情况
      const replacedUrl = url!.replace(/\{([^}]+)\}/g, (res, arg: string) => {
        return args[arg] as string
      })
      // eslint-disable-next-line no-prototype-builtins
      if (!args.hasOwnProperty('arg')) return Promise.reject(new Error('在args中找不到对应的路径参数'))
      req.url = replacedUrl
    }
    return req
  },
  onRejected: (err: any) => {
    console.log(err)
  }
}

export const interceptorResponsetHandler = {
  onFulfilled: (res: AxiosResponse<ResponseDataType>) => {
    const { code, message } = res.data
    const { desc, notifyWhenFailure, notifyWhenSuccess, method } = res.config as RequestConfig
    if (desc) {
      if (code === 0) {
        if (notifyWhenSuccess !== false) {
          if (['delete', 'put', 'post'].includes(method?.toLowerCase() || '') || notifyWhenSuccess === true) {
            console.log('成功', message)
            notification['success']({
              message: `${method}请求`,
              description: `${desc}请求成功`
            })
          }
        }
      } else if (notifyWhenFailure !== false) {
        console.log('失败', message)
        notification['error']({
          message: `${method}请求`,
          description: `${desc}请求失败：${message}`
        })
      }
    }
    return res
  },
  onRejected: (err: AxiosError<ResponseDataType>) => {
    const { response, config } = err
    const { url, desc, method } = config as RequestConfig
    if (desc) {
      console.log('请求错误', url)
      notification['error']({
        message: `${method}请求`,
        description: `${url}请求错误`
      })
    }
    return err
  }
}
