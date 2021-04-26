import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

class Connector {
    constructor(store, chainId) {
        this._store = store
        this._accounts = []
        this._chaninId = chainId
    }

    async connect() {
        // bridge url
        const bridge = "https://bridge.walletconnect.org";
        // create new connector
        const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

        this._connector = connector

        // check if already connected
        if (!connector.connected) {
            // create new session
            await connector.createSession({ chainId: this._chaninId });
        }

        // subscribe to events
        this._subscribeToEvents();
    }

    async disconnect() {
        const connector = this._connector;
        if (connector) {
            await connector.killSession();
        }
        this._store.commit("account/reset");
    }

    async sendTransaction(tx) {
        const connector = this._connector;
        
        if (connector) {
            console.log({ event: "connector.sendTransaction", payload: tx })
            return await connector.sendTransaction(tx);
        }
        
        throw 'The connector is undefined.'
    }

    async signTransaction(tx) {
        const connector = this._connector;

        if (connector) {
            console.log({ event: "connector.signTransaction", payload: tx })
            return await connector.signTransaction(tx);
        }

        throw 'The connector is undefined.'
    }

    _subscribeToEvents() {
        const connector = this._connector;

        if (!connector) {
            return;
        }

        connector.on("session_update", async (error, payload) => {
            console.log(`connector.on("session_update")`);

            if (error) {
                throw error;
            }

            const { chainId, accounts } = payload.params[0];
            this.onSessionUpdate(chainId, accounts);
        });

        connector.on("connect", (error, payload) => {
            console.log(`connector.on("connect")`);

            if (error) {
                throw error;
            }

            const { chainId, accounts } = payload.params[0];
            this.onConnect(chainId, accounts);
        });

        connector.on("disconnect", (error, payload) => {
            console.log(`connector.on("disconnect")`);

            if (error) {
                throw error;
            }

            this.onDisconnect();
        });

        if (connector.connected) {
            console.log(`connector.connected: ${connector.connected}`);

            const { chainId, accounts } = connector;
            this.onConnect(chainId, accounts);
        }

        this._connector = connector;
    }

    onConnect(chainId, accounts) {
        const address = accounts[0];

        this._store.commit("connector/set", {
            connected: true,
            chainId,
            accounts,
            address,
        });
        
        this._store.dispatch("account/balanceOf", address);
        // this.getAccountAssets();
    }

    onDisconnect() {
        console.log('onDisconnect')
        this._store.commit("connector/init");
    }

    onSessionUpdate(chainId, accounts) {
        const address = accounts[0];

        this._store.commit("connector/set", {
            chainId,
            accounts,
            address,
        });
            
        // await this.getAccountAssets();
    }
}

// const Connector = {
//   install (Vue, options) {
//     Vue.prototype.$connector = new WalletConnect(Vue)
//   }
// }

export { Connector }