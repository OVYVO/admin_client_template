import axios from 'axios'
import qs from 'qs'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { increateApiConfig, inheader } from './types'
const createApi = (config: increateApiConfig) => {
  const instance: AxiosInstance = axios.create(config)
  instance.interceptors.request.use(
    (req: increateApiConfig) => {
      const { data = {} } = req
      if (typeof data !== 'string') {
        req.data = qs.stringify(data)
      }
      if (req?.setHeader) {
        const headerObj: inheader = req.setHeader()
        console.log(headerObj)
      }
      return req
    },
    (err: any) => {
      return err
    }
  )
  instance.interceptors.response.use(
    (res: AxiosResponse) => {
      return res
    },
    (err: any) => {
      return err
    }
  )
}

export default createApi
