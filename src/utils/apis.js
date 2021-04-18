import axios from 'axios'

const heco = axios.create({
  baseURL: "https://api-testnet.hecoinfo.com",
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


const getBalance = (address) => {
  return new Promise((resolve, reject) => {
    heco.get(`/api?module=account&action=balance&address=${address}&tag=latest`)
        .then(({ data }) => resolve(data))
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
    getBalance,
    getTransactions,
    getTransactionByHash,
    getTransactionStartBlock,
    getTransactionEndBlock,
    getTokenTransactions
}