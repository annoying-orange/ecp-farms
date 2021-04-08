import detectEthereumProvider from "@metamask/detect-provider";

export default class MetaMaskConnector {
  constructor(chainId) {
    this._accounts = []
    this._chainId = chainId

    if (typeof window.ethereum !== "undefined") {
      ethereum.on("connect", connectInfo => {
        console.log({ connect: connectInfo })
      })

      ethereum.on("disconnect", err => {
        console.log({ disconnect: err })
      })

      ethereum.on("accountsChanged", accounts => {
        console.log({ accountsChanged: accounts })
      })

      ethereum.on("chainChanged", _chainId => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        // window.location.reload();
        console.log({ chainChanged: _chainId })
      })
    }
  }

  get accounts() {
      return this._accounts
  }

  get chainId() {
      return this._chainId
  }
    
  connect(success, error) {
    console.log("Detecting whether to install MetaMask ...")

    const handleAccounts = async (provider) => {
       const chainId = await provider.request({ method: "eth_chainId" })
       const accounts = await provider.request({ method: "eth_accounts" })
       
       return { accounts, chainId }
    }
    
    detectEthereumProvider().then(provider => {
      if (provider) {
        console.log("Ethereum successfully detected!");

        provider.request({ method: "eth_requestAccounts" })
            .then(accounts => {
                provider.request({ method: "eth_chainId" }).then(chainId => {
                    success({ accounts, chainId })
                })
            })
            .catch(err => {
                if (err.code === 4001) {
                    // The user rejected the connection request
                    error("Please connect to MetaMask.");
                } else {
                    error(err);
                }
            });
      } else {
        error("Please install MetaMask!");
      }
    });
  }

  isConnected() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        console.log(`Connected to MetaMask: ${ethereum.isConnected()}`)

        return ethereum.isConnected()
    }

    return false
  }

  async getAccounts() {
    const accounts = await ethereum.request({ method: "eth_accounts" })
    const chainId = await ethereum.request({ method: "eth_chainId" })

    console.log(`The ${accounts} connected to chainId(${chainId}).`)

    return { accounts, chainId }
  }
}