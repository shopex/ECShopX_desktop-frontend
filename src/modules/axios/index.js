import path from 'path'

export default function AxiosModule(moduleOptions) {
  const options = { ...this.options.axios, ...moduleOptions }
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options
  })
}
