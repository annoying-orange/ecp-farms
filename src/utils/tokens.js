const tokens = [
  {
    chainId: 1,
    asset: 'c60_t0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    type: 'ERC20',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    name: 'Wrapped Ethereum',
    symbol: 'WETH',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x6B175474E89094C44Da98b954EedeAC495271d0F',
    type: 'ERC20',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x4Fabb145d64652a948d72533023f6E7A623C7C53',
    type: 'ERC20',
    address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
    name: 'Binance USD',
    symbol: 'BUSD',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4Fabb145d64652a948d72533023f6E7A623C7C53/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    type: 'ERC20',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0xdd974D5C2e2928deA5F71b9825b8b646686BD200',
    type: 'ERC20',
    address: '0xdd974D5C2e2928deA5F71b9825b8b646686BD200',
    name: 'Kyber Network Crystal',
    symbol: 'KNC',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdd974D5C2e2928deA5F71b9825b8b646686BD200/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x514910771AF9Ca656af840dff83E8264EcF986CA',
    type: 'ERC20',
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    name: 'ChainLink',
    symbol: 'Link',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    type: 'ERC20',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    decimals: 8,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0xdAC17F958D2ee523a2206206994597C13D831ec7',
    type: 'ERC20',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    type: 'ERC20',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    name: 'Uniswap',
    symbol: 'UNI',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
    type: 'ERC20',
    address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
    name: 'Basic Attention Token',
    symbol: 'BAT',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0D8775F648430679A709E98d2b0Cb6250d2887EF/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
    type: 'ERC20',
    address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
    name: 'Yearn.Finance',
    symbol: 'YFI',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0xc00e94Cb662C3520282E6f5717214004A7f26888',
    type: 'ERC20',
    address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
    name: 'Compound',
    symbol: 'COMP',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
    type: 'ERC20',
    address: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
    name: 'OMG Network',
    symbol: 'OMG',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xd26114cd6EE289AccF82350c8d8487fedB8A0C07/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
    type: 'ERC20',
    address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
    name: 'MakerDAO',
    symbol: 'MKR',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    type: 'ERC20',
    address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    name: 'Aave Token',
    symbol: 'AAVE',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
    type: 'ERC20',
    address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
    name: 'Synthetix Network Token',
    symbol: 'SNX',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0xD46bA6D942050d489DBd938a2C909A5d5039A161',
    type: 'ERC20',
    address: '0xD46bA6D942050d489DBd938a2C909A5d5039A161',
    name: 'Ampleforth',
    symbol: 'AMPL',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD46bA6D942050d489DBd938a2C909A5d5039A161/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x0000000000085d4780B73119b644AE5ecd22b376',
    type: 'ERC20',
    address: '0x0000000000085d4780B73119b644AE5ecd22b376',
    name: 'TrueUSD',
    symbol: 'TUSD',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000085d4780B73119b644AE5ecd22b376/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
    type: 'ERC20',
    address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
    name: 'Synth sUSD',
    symbol: 'sUSD',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x57Ab1ec28D129707052df4dF418D58a2D46d5f51/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
    type: 'ERC20',
    address: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
    name: 'Lend',
    symbol: 'LEND',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x80fB784B7eD66730e8b1DBd9820aFD29931aab03/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x1985365e9f78359a9B6AD760e32412f4a445E862',
    type: 'ERC20',
    address: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
    name: 'Reputation',
    symbol: 'REP',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1985365e9f78359a9B6AD760e32412f4a445E862/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
    type: 'ERC20',
    address: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
    name: 'Decentraland MANA',
    symbol: 'MANA',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0F5D2fB29fb7d3CFeE444a200298f468908cC942/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0xE41d2489571d322189246DaFA5ebDe1F4699F498',
    type: 'ERC20',
    address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
    name: '0x Protocol Token',
    symbol: 'ZRX',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xE41d2489571d322189246DaFA5ebDe1F4699F498/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c',
    type: 'ERC20',
    address: '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c',
    name: 'Enjin Coin',
    symbol: 'ENJ',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x408e41876cCCDC0F92210600ef50372656052a38',
    type: 'ERC20',
    address: '0x408e41876cCCDC0F92210600ef50372656052a38',
    name: 'Republic Token',
    symbol: 'REN',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x408e41876cCCDC0F92210600ef50372656052a38/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9',
    type: 'ERC20',
    address: '0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9',
    name: 'Swipe',
    symbol: 'SXP',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0xba100000625a3754423978a60c9317c58a424e3D',
    type: 'ERC20',
    address: '0xba100000625a3754423978a60c9317c58a424e3D',
    name: 'Balancer',
    symbol: 'BAL',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55',
    type: 'ERC20',
    address: '0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55',
    name: 'BandToken',
    symbol: 'BAND',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x8400D94A5cb0fa0D041a3788e395285d61c9ee5e',
    type: 'ERC20',
    address: '0x8400D94A5cb0fa0D041a3788e395285d61c9ee5e',
    name: 'Unibright',
    symbol: 'UBT',
    decimals: 8,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x8400D94A5cb0fa0D041a3788e395285d61c9ee5e/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x607F4C5BB672230e8672085532f7e901544a7375',
    type: 'ERC20',
    address: '0x607F4C5BB672230e8672085532f7e901544a7375',
    name: 'iExec RLC',
    symbol: 'RLC',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x607F4C5BB672230e8672085532f7e901544a7375/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x740623d2c797b7D8D1EcB98e9b4Afcf99Ec31E14',
    type: 'ERC20',
    address: '0x740623d2c797b7D8D1EcB98e9b4Afcf99Ec31E14',
    name: 'DoYourTip',
    symbol: 'DYT',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x740623d2c797b7D8D1EcB98e9b4Afcf99Ec31E14/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x2ba592F78dB6436527729929AAf6c908497cB200',
    type: 'ERC20',
    address: '0x2ba592F78dB6436527729929AAf6c908497cB200',
    name: 'Cream',
    symbol: 'CREAM',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2ba592F78dB6436527729929AAf6c908497cB200/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0xF5D669627376EBd411E34b98F19C868c8ABA5ADA',
    type: 'ERC20',
    address: '0xF5D669627376EBd411E34b98F19C868c8ABA5ADA',
    name: 'Axie Infinity',
    symbol: 'AXS',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xF5D669627376EBd411E34b98F19C868c8ABA5ADA/logo.png'
  },
  {
    chainId: 1,
    asset: 'c60_t0x37236CD05b34Cc79d3715AF2383E96dd7443dCF1',
    type: 'ERC20',
    address: '0x37236CD05b34Cc79d3715AF2383E96dd7443dCF1',
    name: 'Small Love Potion',
    symbol: 'SLP',
    decimals: 0,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x37236CD05b34Cc79d3715AF2383E96dd7443dCF1/logo.png'
  }
]

export default tokens
