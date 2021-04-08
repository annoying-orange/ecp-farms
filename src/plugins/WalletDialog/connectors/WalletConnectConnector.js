import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export default class WalletConnectConnector {
    constructor(chainId) {
        this._accounts = []
        this._chaninId = chainId
    }

    get acounts() {
        return this._accounts;
    }

    get chainId() {
        return this._chaninId;
    }

    connect (success, err) {
      console.log("Connect with WalletConnect")
      this.provider = this._newProvider(success, err);

      if (!this.provider.connected) {
        console.log("Waiting for create session with wallet connection ...");
        this.provider.createSession({ chainId: this._chainId });
      } else {
        console.log("The wallet connected.");
        console.log(this.provider);

        const { accounts, chainId } = this.provider;
        success()
      }
    }

    isConnected() {
      console.log(this.provider)
      if (this.provider === undefined) {
        this.provider = this._newProvider()
      }
      
      return this.provider.connected
    }

    async getAccounts() {
      if (this.provider === undefined) {
        this.provider = this._newProvider()
      }

      return new Promise((resolve, reject) => {
        const { accounts, chainId } = this.provider;
        console.log(`The ${accounts} connected to chainId(${chainId}).`)

        resolve({ accounts, chainId })
      })
    }

    _newProvider(success, err) {
      const provider = new WalletConnect({
          bridge: "https://bridge.walletconnect.org", // Required
          qrcodeModal: QRCodeModal
      });

      // Subscribe to connection events
      provider.on("connect", (error, payload) => {
        if (error) {
          throw error
        }

        console.log({ connect: payload });

        // Get provided accounts and chainId
        const { chainId, accounts } = payload.params[0];

        this._accounts = accounts;
        this._chainId = chainId;

        if (success) {
          success({ accounts, chainId })
        }
      });

      provider.on("session_update", (error, payload) => {
        if (error) {
            throw error;
        }

        console.log({ session_update: payload });
        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0];
        // store.commit("wallet/updateWallet", {
        //   address: accounts[0],
        //   chainId,
        //   connected: true
        // });
        // store.dispatch("wallet/getAssets");
        if (success) {
          success({ accounts, chainId })
        }
      });

      provider.on("disconnect", (error, payload) => {
        if (error) {
            throw error;
        }

        console.log({ disconnect: payload });

        if (success) {
          success({ address: [], chainId: 0 })
        }

        // store.commit("wallet/updateWallet", { address: "0x", chainId: 0 });
      });
      
      return provider
    }
}