import { CrowdsaleContract, PaymentToken } from "../../utils/contracts"

export default function () {
  return {
    id: 0,
    name: "",
    address: "",
    code: "",
    referrals: [],
    inviteCode: "",
    ht: {
      symbol: 'HT',
      balance: 0
    },
    usdt: {
      address: PaymentToken.address,
      name: PaymentToken.name,
      symbol: PaymentToken.symbol,
      balance: 0
    },
    eth: {
      address: CrowdsaleContract.token.address,
      name: CrowdsaleContract.token.name,
      symbol: CrowdsaleContract.token.symbol,
      balance: 0
    }
  }
}
