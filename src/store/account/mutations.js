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