import { Network } from "../../utils/contracts"

export default function () {
  return {
    name: '',
    description: '',
    fetching: false,
    connected: false,
    chainId: Network.chainId,
    accounts: [],
    address: "",
    assets: []
  }
}
