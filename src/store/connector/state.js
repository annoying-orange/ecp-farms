import { NETWORK } from "../../utils/contracts"

export default function () {
  return {
    name: '',
    description: '',
    fetching: false,
    connected: false,
    chainId: NETWORK,
    accounts: [],
    address: "",
    assets: []
  }
}
