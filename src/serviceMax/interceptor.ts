import type { RequestConfig } from './types'

export const interceptorRequesthandler = {
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
