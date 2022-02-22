import Modal from './service'

export default {
  install(Vue) {
    if (Vue.prototype.$Modal) return
    Vue.prototype.$Modal = Modal
  }
}
