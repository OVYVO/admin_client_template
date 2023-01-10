import type { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'

export interface inheader extends RawAxiosRequestHeaders {
  'Content-Type'?: string
}
export interface increateApiConfig extends AxiosRequestConfig {
  setHeader?: () => inheader
}

export interface inresponse<T> {
  errCode: number
  msg: string
  action: any
  data: T
}
