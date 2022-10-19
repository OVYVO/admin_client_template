import axios from 'axios'
import qs from 'qs'
//import localApi from './localApi'
import { showLoading, hideLoading } from './loading'
import { message } from 'element-ui'

const noop = () => {}

export function createApi({ createOptions = {}, setHeaders = noop } = {}) {
  const instance = axios.create(createOptions)
  instance.interceptors.request.use(
    config => {
      const { data = {} } = config
      if (typeof data !== 'string') {
        config.data = qs.stringify(data)
      }
      const headers = setHeaders(config) || {}
      for (let key in headers) {
        const value = headers[key]
        config.headers[key] = value
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  instance.interceptors.response.use(
    res => {
      const { errCode, code } = res.data
      if (errCode == 1) {
        return Promise.reject(res)
      } else if (errCode == 0 || code == 0) {
        return res
      } else if (errCode == -200) {
        // localApi.clear()
        // window.location.reload()
      }
    },
    error => {
      return Promise.reject(error)
    }
  )

  return async (options, { shouldLoading = false } = {}) => {
    if (shouldLoading) {
      showLoading()
    }
    try {
      const response = await instance(options)
      const { data } = response
      hideLoading()
      return data
    } catch (e) {
      const { msg = '' } = e.data
      const errorMessage = `${options.url}接口报错:${msg}`
      if (shouldLoading) {
        hideLoading()
      }
      message.error(msg)
      return Promise.reject(errorMessage)
    }
  }
}
