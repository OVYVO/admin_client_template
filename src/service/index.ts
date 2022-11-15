import { createApi } from './createApi'
import { inheader } from './types'

const request = createApi({
  setHeader: (): inheader => ({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  })
})

export default request
