import axios from 'axios'

const ethereum = axios.create({
  baseURL: "https://ethereum-api.xyz",
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const getAccountAssets = (address, chainId) => {
    return new Promise((resolve, reject) => {
      ethereum.get(`/account-assets?address=${address}&chainId=${chainId}`)
        .then((response) => {
          const { result } = response.data
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
}

export default getAccountAssets