export default function({ store, app, route, redirect }) {
  const { fullPath } = route
  let token
  if (process.client) {
    token = $nuxt.$cookies.get('ECSHOPX_TOKEN')
  } else {
    token = app.$cookies.get('ECSHOPX_TOKEN')
  }
  // debugger

  if (!token) {
    return redirect({
      path: `/auth/login?redirectUrl=${encodeURIComponent(fullPath)}`
    })
  }
}
