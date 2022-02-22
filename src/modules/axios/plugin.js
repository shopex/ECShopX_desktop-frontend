import api, { req } from '@/api'

export default ({ app }, inject) => {
  inject('http', req)
  inject('api', api)
}
