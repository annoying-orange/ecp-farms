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
      name: 'Tether USD',
      symbol: 'USDT',
      address: '0xED02B442b0eF5bC681c08953c5122063a497E804',
      balance: 0
    },
    eth: {
      name: 'Ether',
      address: '0xF22108A9f42EB64EF0603dE2484b506e88168084',
      symbol: 'ETH',
      balance: 0
    },
    minAllocation: 0,
    maxAllocation: 99999999
  }
}
