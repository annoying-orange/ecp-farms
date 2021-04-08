import Vue from 'vue'
import Web3 from 'web3'

const web3 = new Web3('https://http-testnet.hecochain.com')
Vue.prototype.$web3 = web3

Vue.filter('balance', function (val) {
  return val ? parseFloat(web3.utils.fromWei(val)).toFixed(4) : val
})

Vue.filter('fromWei', function (val) {
  return val ? web3.utils.fromWei(val) : val
})

Vue.filter('datetime', function (timestamp) {
  if (!timestamp || timestamp === '') {
    return '-'
  }

  const dt = new Date(timestamp * 1000)
  const year = dt.getFullYear()
  const month = ('' + (dt.getMonth() + 1)).padStart(2, '0')
  const date = (dt.getDate() + '').padStart(2, '0')
  const hours = (dt.getHours() + '').padStart(2, '0')
  const minutes = (dt.getMinutes() + '').padStart(2, '0')
  const seconds = (dt.getSeconds() + '').padStart(2, '0')

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
})

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue, store }) => {
  // Detect the connector

}
