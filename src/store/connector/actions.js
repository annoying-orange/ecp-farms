import axios from 'axios'
import connectors from '../../plugins/WalletDialog/connectors'
import { Network } from '../../utils/contracts'

const heco = axios.create({
  baseURL: Network.api,
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export function getBalance({ state }, address) {
  return new Promise((resolve, reject) => {
    heco.get(`/api?module=account&action=balance&address=${address}&tag=latest`)
        .then(({ data }) => {
          const { status, message, result } = data
          if (status === "1") {
            resolve(result)
          } else {
            reject(result);
          }
        })
        .catch(err => reject(err))
  })
}

export function getTransactions({ state }, address, count) {
  return new Promise((resolve, reject) => {
    heco.get(`/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${count}&sort=desc`)
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}

export function abi({ state }, address) {
  return new Promise((resolve, reject) => {
    heco.get(`/api?module=contract&action=getabi&address=${address}`)
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}

export function sendTransaction({ state }, tx) {
  console.log({ state, connectors})
  const { connector } = connectors.find(c => c.name === state.name)

  return new Promise((resolve, reject) => {
    connector.sendTransaction(tx)
      .then(data => {
        resolve(data)
      })
      .catch(err => reject(err))
  })
}
