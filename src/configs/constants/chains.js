const chains = [
  {
    name: "Heco Mainnet",
    short_name: "clo",
    chain: "callisto",
    network: "mainnet",
    chain_id: 128,
    network_id: 128,
    rpc_url: "https://http-mainnet-node.huobichain.com",
    native_currency: {
      symbol: "HT",
      name: "HT",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Heco Testnet",
    short_name: "clo",
    chain: "callisto",
    network: "mainnet",
    chain_id: 256,
    network_id: 256,
    rpc_url: "https://http-testnet.hecochain.com",
    native_currency: {
      symbol: "HT",
      name: "HT",
      decimals: "18",
      contractAddress: "",
      balance: "",
    }
  }
]

export default chains