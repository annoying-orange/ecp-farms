import axios from 'axios'

const heco = axios.create({
  baseURL: "https://api-testnet.hecoinfo.com",
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export function getBalance(state, address) {
  return new Promise((resolve, reject) => {
    heco.get(`/api?module=account&action=balance&address=${address}&tag=latest`)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
  })
}

export function getTransactions(state, address, count) {
  return new Promise((resolve, reject) => {
    heco.get(`/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${count}&sort=desc`)
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}

export function abi(state, address) {
  return new Promise((resolve, reject) => {
    heco.get(`/api?module=contract&action=getabi&address=${address}`)
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}
