export default function errorHandler ({ beforeNuxtRender, nuxtState}) {
  if (process.server) {
    beforeNuxtRender(({ nuxtState }) => {
      if (nuxtState.error) {
        delete nuxtState.error.path
      }
    })
  }
}