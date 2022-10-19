import type { AxiosRequestConfig } from 'axios'

export interface inheader {
  'Content-Type'?: string
}
export interface increateApiConfig extends AxiosRequestConfig {
  setHeader?: () => inheader
}
