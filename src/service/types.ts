import type { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'

export interface inheader extends RawAxiosRequestHeaders {
  'Content-Type'?: string
}
export interface increateApiConfig extends AxiosRequestConfig {
  setHeader?: () => inheader
}
