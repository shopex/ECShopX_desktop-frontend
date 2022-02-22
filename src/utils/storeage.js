import store from 'store'
import { expirePlugin } from './expire'
store.addPlugin(expirePlugin)
const gstore = store
export default gstore
