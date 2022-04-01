import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import S from '@/spx'
import createSign from './sign'
import state from '@/store'
import { getSaaSCompanyId } from '@/utils'

function reqErr(res, msg = '') {
  const { data } = res.data || {}
  msg = data.msg || data.err_msg || msg
  const err = new Error(msg)
  err.res = res

  return err
}

function getDomain() {
  let id
  try {
    const origin = window.location.origin
    const firstDot = origin.split('.')[0]
    const domain = firstDot.split('//')[1]
    id = domain.replace(/[^0-9]/gi, '')
  } catch {
    id = process.env.VUE_APP_COMPANYID
  }
  return id
}

function resolveGetMethod(inst) {
  const origGetMethod = inst.get

  inst.get = function(url, params, config = {}) {
    config = {
      params,
      ...config
    }
    return origGetMethod(url, config)
  }
}

function errorToast(data) {
  if (process.client) {
    const errMsg = data.msg || (data.error && data.error.message) || '操作失败'
    Vue.prototype.$Message.error(errMsg)
  }
}

function errorMessage(message) {
  if (process.client) {
    Vue.prototype.$Message.error(message)
  }
}

class CreateAxios {
  constructor() {
    this.created()
    return this.inst
  }

  created() {
    console.log('CreateAxios Class created......')
    this.inst = axios.create()
    this.inst.defaults.timeout = process.env.NODE_ENV === 'production' ? 10000 : 30 * 1000
    this.inst.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || '/'
    this.inst.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    this.inst.interceptors.request.use((config) => {
      const isGetMethod = config.method === 'get'
      const showError = config.showError === undefined ? true : config.showError

      let token, companyid

      if (process.client) {
        token = $nuxt.$cookies.get('ECSHOPX_TOKEN')
        if (process.env.VUE_APP_SAAS != 'true') {
          companyid = process.env.VUE_APP_COMPANYID
        }
        // companyid =
        //   process.env.VUE_APP_SAAS == 'true'
        //     ? $nuxt.$cookies.get('ECSHOPEX_COMPANYID')
        //     : process.env.VUE_APP_COMPANYID
      } else {
        const { app, req } = CreateAxios.content
        token = app.$cookies.get('ECSHOPX_TOKEN')
        if (process.env.VUE_APP_SAAS != 'true') {
          companyid = process.env.VUE_APP_COMPANYID
        } else {
          const { host } = req.headers
          config.headers['origin'] = host
        }
      }

      // console.log('request header:', config.headers)
      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
      }
      console.log('ECSHOPX_PC :', JSON.stringify(config))
      // console.log(`[ECSHOPX_TOKEN]: ${token}`)
      // console.log(`[COMPANY ID IS]: ${companyid}`)
      // console.log('[CONFIG DATA IS]:', config.params, config.data)
      if (isGetMethod) {
        config.params = {
          ...config.params,
          company_id: companyid
        }
      } else {
        config.data = {
          ...config.data,
          company_id: companyid
        }
      }

      config.showError = showError

      config.transformRequest = [
        function(data, headers) {
          return qs.stringify(data)
        }
      ]
      return config
    })

    this.inst.interceptors.response.use(
      (res) => {
        const {
          data,
          status,
          config: { showError }
        } = res
        if (process.server) {
          const req = res.request
          console.log(`server request: [${req.method}] ${req.res.responseUrl}`)
        }
        // console.log('status:', status)
        if (status === 200) {
          if (data.data) {
            const { status_code, message } = data.data
            if(status_code && status_code > 300){
              errorMessage(message)
              return Promise.reject(message)
            }
            return data.data
          } else {
            const { status_code, message } = data
            if(status_code && status_code > 300){
              errorMessage(message)
              return Promise.reject(message)
            }
            return Promise.reject(data)
          }
        }
        return Promise.reject(reqErr(res))
      },
      (err) => {
        console.log( 'xxx:', err )
        // console.log(`server request error: [${req.method}] ${req.res.responseUrl}`)
        switch (err.response.status) {
          case 401:
            // if ( process.client ) {
            const { app } = CreateAxios.content
            app.$cookies.remove('ECSHOPX_TOKEN')
            S.logout()
            window.location.href = `/auth/login?redirectUrl=${$nuxt.$route.fullPath}`
            // }
            break
          default:
            errorToast(err.response.data)
            break
        }
        if (err.response.status >= 500) {
          return Promise.reject(err.response)
        } else {
          return Promise.reject()
        }
      }
    )
    resolveGetMethod(this.inst)
    return this.inst
  }

  static init(content) {
    CreateAxios.content = content
  }

  static getInstance() {
    if (!CreateAxios.instance) {
      CreateAxios.instance = new CreateAxios()
    }
    return CreateAxios.instance
  }
}

const req = CreateAxios.getInstance()

export default req

export { CreateAxios }
