import axios from 'axios'
import qs from 'qs'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { increateApiConfig, inheader } from './types'
import { showLoading, hiddenLoading } from '@/components/MyLoading'

export const createApi = (config: increateApiConfig) => {
  const instance: AxiosInstance = axios.create(config)
  instance.interceptors.request.use(
    (req: increateApiConfig) => {
      const { data = {} } = req
      if (typeof data !== 'string') {
        req.data = qs.stringify(data)
      }
      if (req?.setHeader) {
        const headerObj: inheader = req.setHeader()
        req.headers = headerObj
      }
      return req
    },
    (err: any) => {
      return err
    }
  )
  instance.interceptors.response.use(
    (res: AxiosResponse) => {
      const { errCode, code } = res.data
      if (errCode == 1) {
        return Promise.reject(res)
      } else if (errCode == 0 || code == 0) {
        return res
      } else {
        return Promise.reject('请求失败')
      }
    },
    (err: any) => {
      return err
    }
  )
  return async (options: increateApiConfig, { shouldLoading = false } = {}) => {
    if (shouldLoading) {
      showLoading()
    }
    try {
      const response = await instance(options)
      hiddenLoading()
      const { data } = response
      return data
    } catch (e: any) {
      const { msg = '' } = e.data
      const errorMessage = `${options.url}接口报错:${msg}`
      if (shouldLoading) {
        hiddenLoading()
      }
      console.log(errorMessage)
      return Promise.reject(errorMessage)
    }
  }
}
