import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import MetaMaskConnector from "./MetaMaskConnector"
import WalletConnectConnector from "./WalletConnectConnector"
import { NETWORK } from "../../../utils/contracts"

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
  {
    name: 'MetaMask',
    icon: 'svguse:icons/icons.svg#metamask',
    description: 'Connect With MetaMask',
    connector: new MetaMaskConnector(NETWORK),
    enable: typeof window.ethereum !== 'undefined'
  },
  {
    name: 'WalletConnect',
    icon: 'svguse:icons/icons.svg#wallet-connect',
    description: 'Connect With WalletConnect',
    connector: new WalletConnectConnector(NETWORK),
    enable: true
  }
]

export default connectors.filter(c => c.enable === true);