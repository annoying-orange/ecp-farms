import { Network } from "../../utils/contracts"

export function update (state, { name, description, accounts, chainId }) {
    if (accounts.length === 0) {
        state = Object.assign(state, {
            connected: false,
            name: '',
            description: '',
            address: '',
            chainId: 0
        })
    } else {
        state = Object.assign(state, {
            connected: true,
            name,
            description,
            address: accounts[0],
            chainId
        })
    }
}

export function init (state) {
    state = Object.assign(state, {
        name: '',
        description: '',
        fetching: false,
        connected: false,
        chainId: Network.chainId,
        accounts: [],
        address: "",
        assets: []
    })
}

export function set(state, value) {
    state = Object.assign(state, value)
}
