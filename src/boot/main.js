import Vue from 'vue'
import Web3 from 'web3'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import VueClipboard from 'vue-clipboard2'

import { Connector } from '../plugins/wallectconnect'
import { Network } from '../utils/contracts'

VueClipboard.config.autoSetContainer = true

Vue.use(VueApollo)
Vue.use(VueClipboard)

const web3 = new Web3(Network.rpc)
Vue.prototype.$web3 = web3

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: { }
  })

  return forward(operation)
})

const httpLink = new HttpLink({
  uri: 'https://api.1ecp.com'
})

const wsLink = new WebSocketLink({
  uri: 'wss://api.1ecp.com',
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

Vue.filter('address', function(val) {
  return val
    ? val.substring(0, 6) + "***" + val.substring(val.length - 4) : val;
}),

Vue.filter('balance', function (val) {
  return val ? parseFloat(web3.utils.fromWei(val)).toFixed(6) : val
})

Vue.filter('number', function (s) {
  var value = new String(s)
  if (!value) return '0'
  var intPart = Number(value) | 0
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  var floatPart = ".00";
  var value2Array = value.split(".");

  if (value2Array.length == 2) {
    floatPart = value2Array[1].toString();

    if (floatPart.length == 1) {
      return intPartFormat + "." + floatPart + '0';
    }
    else {
      return intPartFormat + "." + Math.round(parseFloat('0.' + floatPart).toFixed(2) * 100);
    }
  }
  else {
    return intPartFormat;
  }
})

Vue.filter('fixed', function (val) {
  return val ? parseFloat(val).toFixed(6) : val
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

Vue.directive('numberOnly', {
  bind: function (el) {
    el.handler = function () {
      el.value = el.value.replace(/\D+/, '')
    }
    el.addEventListener('input', el.handler)
  },
  unbind: function (el) {
    el.removeEventListener('input', el.handler)
  }
})

Vue.directive('focus', {
  inserted: function (el, { value }) {
    if (value) {
      el.focus()

      if (el.select) {
        el.select()
      }
    }
  }
})

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue, store }) => {
  app.apolloProvider = new VueApollo({
    defaultClient: new ApolloClient({
      link: authMiddleware.concat(link),
      cache: new InMemoryCache({ }),
      connectToDevTools: true
    })
  })

  Vue.prototype.$connector = new Connector(store, Network.chainId)
}
