export function update (state, { accounts, chainId }) {
    if (accounts.length === 0) {
        state.connected = false
    } else {
        state.connected = true
        state.address = accounts[0]
        state.chainId = chainId
    }
}
