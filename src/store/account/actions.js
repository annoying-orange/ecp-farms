import Web3 from 'web3'
import { balanceOfHT } from '../../utils/apis'
import { Network, CrowdsaleContract, PaymentToken } from '../../utils/contracts'

const web3 = new Web3(Network.rpc);

const getBalance = async (address, token) => {
  const contract = new web3.eth.Contract(token.abi, token.address);
  const decimals = await contract.methods.decimals().call();
  const balance = await contract.methods.balanceOf(address).call();
  return balance / Math.pow(10, decimals);
}

export function balanceOf({ commit }, address) {
    balanceOfHT(address).then(balance => {
      commit("ht", { balance: parseFloat(web3.utils.fromWei(balance)) });
    })

    // USDT balance
    getBalance(address, PaymentToken).then(balance => {
        commit("usdt", { balance });
      });

    // ETS balance
    getBalance(address, CrowdsaleContract.token).then(balance => {
        commit("eth", { balance });
    });
}