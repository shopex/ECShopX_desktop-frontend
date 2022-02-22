import Baidu from './baidu'

class Trackers {
  constructor () {
    this.providers = {
      baidu: Baidu
    }
  }

  get (name, options) {
    const Tracker = this.providers[name]
    return new Tracker(options)
  }
}

export default new Trackers()
