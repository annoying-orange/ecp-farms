import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import MetaMask from "./connectors"
import { Network } from "../../utils/contracts"

const connectors = [
//   {
//     name: 'Huobi Wallet',
//     icon: '/img/icon-ht.png',
//     connector: {
//         connect: () => {
//             console.log('Connect with Huobi Wallet.')
//         }
//     }
//   },
//   {
//     name: 'MetaMask',
//     icon: 'svguse:icons/icons.svg#metamask',
//     connector: metamask
//   },
  {
    name: 'WalletConnect',
    icon: 'svguse:icons/icons.svg#wallet-connect',
    connector: {
        connect: () => {
            console.log('Connect with WalletConnect.')
            const connector = new WalletConnect({
                bridge: "https://bridge.walletconnect.org", // Required
                qrcodeModal: QRCodeModal
            });

            // Subscribe to connection events
            connector.on("connect", (error, payload) => {
                if (error) {
                    throw error;
                }

                console.log({ connect: payload });
                // Get provided accounts and chainId
                // const { accounts, chainId } = payload.params[0];
                // store.commit("wallet/updateWallet", {
                //   address: accounts[0],
                //   chainId,
                //   connected: true
                // });
                // store.dispatch("wallet/getAssets");

                const { chainId, accounts } = payload.params[0];
                const address = accounts[0];
                this.connected = true;
                this.chainId = chainId;
                this.accounts = accounts;
                this.address = address;
                console.log({address, chainId})
                // getAccountAssets(address, chainId).then(result => (this.assets = result));
            });

            connector.on("session_update", (error, payload) => {
                if (error) {
                    throw error;
                }

                console.log({ session_update: payload });
                // Get updated accounts and chainId
                // const { accounts, chainId } = payload.params[0];
                // store.commit("wallet/updateWallet", {
                //   address: accounts[0],
                //   chainId,
                //   connected: true
                // });
                // store.dispatch("wallet/getAssets");
            });

            connector.on("disconnect", (error, payload) => {
                if (error) {
                    throw error;
                }

                console.log({ disconnect: payload });

                // store.commit("wallet/updateWallet", { address: "0x", chainId: 0 });
            });
            
            if (!connector.connected) {
                console.log("Waiting for create session with wallet connection ...");
                connector.createSession({ chainId: Network.chainId });
            } else {
                console.log("The wallet connected.");

                const { chainId, accounts } = connector;
                const address = accounts[0];

                // this.connected = true;
                // this.chainId = chainId;
                // this.accounts = accounts;
                // this.address = address;
                
                console.log({address, chainId})
                // getAccountAssets(address, chainId).then(result => console.log(result));
            }
        }
    }
  }
]

export default connectors;