import request from '../service/index'

export function getUser() {
  return request({
    url: '/api/getUsers'
  })
}
