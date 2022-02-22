export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    if (to.name === 'cart-checkout' && from.name === 'cashier') {
      next({ path: '/member/trade' })
      return
    }
    next()
  })
}
