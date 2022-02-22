import api, { CreateAxios, req } from '@/api'

export default (content, inject) => {
  CreateAxios.init(content)

  inject('http', req)
  inject('api', api)
}
