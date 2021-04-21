import { CrowdsaleContract, PaymentToken } from "../../utils/contracts"

export function update(state, acount) {
    state = Object.assign(state, acount)
}

export function reset(state) {
    state = Object.assign(state, {
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
    })
}

export function ht (state, ht) {
    console.log({ HT: ht })
    state.ht = Object.assign(state.ht, ht)
}

export function usdt (state, usdt) {
    console.log({ USDT: usdt })
    state.usdt = Object.assign(state.usdt, usdt)
}

export function eth (state, eth) {
    console.log({ ETH: eth })
    state.eth = Object.assign(state.eth, eth)
}