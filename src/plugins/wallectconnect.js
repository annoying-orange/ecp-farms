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
        console.log(this._store.state.account)

        this._connector = connector

        // check if already connected
        if (!connector.connected) {
            // create new session
            await connector.createSession();
        }

        // subscribe to events
        this._subscribeToEvents();
    }

    disconnect() {
        const connector = this._connector;
        if (connector) {
            connector.killSession();
        }
        //
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
            this.onSessionUpdate(accounts, chainId);
        });

        connector.on("connect", (error, payload) => {
            console.log(`connector.on("connect")`);

            if (error) {
                throw error;
            }

            this.onConnect(payload);
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
            const address = accounts[0];
            
            this._store.commit("connector/set", {
                connected: true,
                chainId,
                accounts,
                address,
            });

            this.onSessionUpdate(accounts, chainId);
        }

        this._connector = connector;
    }

    onConnect(payload) {
        const { chainId, accounts } = payload.params[0];
        const address = accounts[0];

        this._store.commit("connector/set", {
            connected: true,
            chainId,
            accounts,
            address,
        });

        // this.getAccountAssets();
    }

    onDisconnect() {
        console.log('onDisconnect')
        this._store.commit("connector/init");
    }

    onSessionUpdate(accounts, chainId) {
        const address = accounts[0];
        console.log({ chainId, accounts, address });
        // await this.getAccountAssets();
    }
}

// const Connector = {
//   install (Vue, options) {
//     Vue.prototype.$connector = new WalletConnect(Vue)
//   }
// }

export { Connector }