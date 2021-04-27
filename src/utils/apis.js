import axios from 'axios'
import { Network } from './contracts'

const heco = axios.create({
  baseURL: Network.api,
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


const balanceOfHT = (address) => {
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

const getTransactions = (address, count) => {
  return new Promise((resolve, reject) => {
    heco.get(`/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${count}&sort=desc`)
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}

const getTransactionByHash = (address, hash) => {
  return new Promise((resolve, reject) => {
    getTransactions(address, 20)
      .then(({ status, message, result }) => {
        console.log({status, message, result})
        if (status === "1") {
          const t = result.find(tx => tx.hash === hash)
          console.log(t)
          return resolve(t)
        } else {
          reject(message)
        }
      })
      .catch(err => reject(err))
  })
}

const getTransactionStartBlock = (address) => {
  return new Promise((resolve, reject) => {
    heco.get(`/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&page=1&offset=1&sort=asc`)
      .then(({ data }) => {
          const { status, message, result } = data
          if (status === "1") {
              resolve(result[0].blockNumber)
          } else {
              reject(message)
          }
      })
      .catch(err => reject(err))
  })
}

const getTransactionEndBlock = (address) => {
  return new Promise((resolve, reject) => {
    heco.get(`/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&page=1&offset=1&sort=desc`)
      .then(({ data }) => {
          const { status, message, result } = data
          if (status === "1") {
              resolve(result[0].blockNumber)
          } else {
              reject(message)
          }
      })
      .catch(err => reject(err))
  })
}

const getTokenTransactions = (address, count) => {
  return new Promise((resolve, reject) => {
    heco.get(`/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=${count}&sort=desc`)
      .then(({ data }) => {
        const { status, message, result } = data
        if (status === "1") {
            resolve(result)
        } else {
            reject(message)
        }
      })
      .catch(err => reject(err))
  })
}

export {
    balanceOfHT,
    getTransactions,
    getTransactionByHash,
    getTransactionStartBlock,
    getTransactionEndBlock,
    getTokenTransactions
}