import axios from 'axios'
import qs from 'qs'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { increateApiConfig, inheader } from './types'
const createApi = (config: increateApiConfig) => {
  const instance: AxiosInstance = axios.create(config)
  instance.interceptors.request.use(
    (req: increateApiConfig) => {
      const { data = {}, setHeader = () => {} } = req
      if (typeof data !== 'string') {
        req.data = qs.stringify(data)
      }
      const headerObj: inheader = setHeader()

      for (const key in headerObj) {
        const value = headerObj[key]
        req?.headers[key] = value
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
