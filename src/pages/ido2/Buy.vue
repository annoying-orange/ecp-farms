<template>
  <q-page class="nk-content-body">
    <div class="buysell wide-xs m-auto">
      <!-- .buysell-nav -->
      <div class="buysell-title text-center">
        <h5 class="title">{{ $t("buy.title") }}</h5>
      </div>
      <!-- .buysell-title -->
      <div class="buysell-block">
        <form action="#" class="buysell-form">
          <div class="buysell-field form-group">
            <div class="form-label-group">
              <label class="form-label">{{ $t("buy.token") }}</label>
            </div>
            <input
              type="hidden"
              value="btc"
              name="bs-currency"
              id="buysell-choose-currency"
            />
            <div class="dropdown buysell-cc-dropdown">
              <a
                href="#"
                class="buysell-cc-choosen dropdown-indicator"
                data-toggle="dropdown"
              >
                <div class="coin-item coin-btc">
                  <div class="coin-icon">
                    <em class="icon ni ni-sign-btc-alt"></em>
                  </div>
                  <div class="coin-info">
                    <span class="coin-name">
                      {{ buy.name }} ({{ buy.symbol }})
                    </span>
                    <span class="coin-text">{{ buy.address | address }}</span>
                  </div>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-auto dropdown-menu-mxh">
                <ul class="buysell-cc-list">
                  <li class="buysell-cc-item selected">
                    <a href="#" class="buysell-cc-opt" data-currency="btc">
                      <div class="coin-item coin-btc">
                        <div class="coin-icon">
                          <em class="icon ni ni-sign-btc-alt"></em>
                        </div>
                        <div class="coin-info">
                          <span class="coin-name">
                            {{ buy.name }} ({{ buy.symbol }})
                          </span>
                          <span class="coin-text">
                            {{ buy.address }}
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <!-- .dropdown-menu -->
            </div>
            <!-- .dropdown -->
          </div>
          <!-- .buysell-field -->
          <div class="buysell-field form-group">
            <div class="form-label-group">
              <label class="form-label" for="buysell-amount">
                {{ $t("buy.amount") }}
              </label>
            </div>
            <div class="form-control-group">
              <input
                type="text"
                class="form-control form-control-lg form-control-number"
                id="buysell-amount"
                name="bs-amount"
                placeholder="0.000000"
                v-model="amount"
                v-on:focus="amount = null"
              />
              <div class="form-dropdown">
                <div class="text">{{ buy.symbol }}<span>/</span></div>
                <div class="dropdown">
                  <a
                    href="#"
                    class="dropdown-indicator-caret"
                    data-toggle="dropdown"
                    data-offset="0,2"
                  >
                    USDT
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-xxs dropdown-menu-right text-center"
                  >
                    <ul class="link-list-plain">
                      <li><a href="#">USDT</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-note-group">
              <span class="buysell-min form-note-alt">
                {{ $t("buy.minimum") }}: {{ buy.min }}
                {{ buy.symbol }}
              </span>
              <span class="buysell-rate form-note-alt">
                {{ buy.exchange }} {{ buy.symbol }} =
                {{ paymentToken.exchange }}
                {{ paymentToken.symbol }}
              </span>
            </div>
          </div>
          <!-- .buysell-field -->
          <div class="buysell-field form-group">
            <div class="buysell-title text-center">
              <h5 class="title">~ {{ expectPaymentAmount }} USDT</h5>
            </div>
          </div>

          <div class="buysell-field form-action">
            <a
              href="#"
              class="btn btn-lg btn-block btn-primary"
              data-toggle="modal"
              data-target="#confirm-coin"
              v-on:click="onBuy"
              v-if="connected"
            >
              {{ $t("buy.continueToBuy") }}
            </a>
            <a
              href="#"
              class="btn btn-lg btn-block btn-primary"
              v-on:click="onConnect"
              v-else
            >
              {{ $t("account.connectWallet") }}
            </a>
          </div>
          <!-- .buysell-field -->
        </form>
        <!-- .buysell-form -->
      </div>
      <!-- .buysell-block -->
    </div>
    <!-- .buysell -->
    <!-- @@ Confirm Coin Modal @e -->
    <div class="modal fade" tabindex="-1" role="dialog" id="confirm-coin">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content" v-if="sending">
          <div class="modal-body modal-body-lg text-center">
            <div class="nk-modal">
              <q-spinner
                color="secondary"
                size="5em"
                :thickness="2"
                class="q-mb-lg"
              />
              <div class="nk-modal-text">
                <p class="caption-text">{{ $t("buy.sendTransaction") }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-content" v-else-if="err">
          <a href="#" class="close" data-dismiss="modal"
            ><em class="icon ni ni-cross-sm"></em
          ></a>
          <div class="modal-body modal-body-lg text-center">
            <div class="nk-modal">
              <em
                class="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-cross bg-danger"
              ></em>
              <h4 class="nk-modal-title">{{ err.error }}</h4>
              <div class="nk-modal-text">
                <p class="caption-text">
                  {{ err.message }}
                </p>
              </div>
              <div class="nk-modal-action-lg">
                <ul class="btn-group gx-4">
                  <li>
                    <a
                      href="#"
                      data-dismiss="modal"
                      class="btn btn-lg btn-mw btn-light"
                    >
                      {{ $t("buy.return") }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-content" v-else>
          <a href="#" class="close" data-dismiss="modal"
            ><em class="icon ni ni-cross-sm"></em
          ></a>
          <div class="modal-body modal-body-lg text-center">
            <div class="nk-modal">
              <em
                class="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-check bg-success"
              ></em>
              <h4 class="nk-modal-title">{{ $t("buy.successfully") }}</h4>
              <div class="nk-modal-text">
                <p class="caption-text">
                  You’ve successfully bought
                  <strong>{{ amount }}</strong>
                  {{ buy.symbol }}
                  for
                  <strong>{{ expectPaymentAmount }}</strong>
                  {{ paymentToken.symbol }}.
                </p>
                <p class="sub-text-sm">
                  {{ $t("buy.howReceiveToken") }}
                  <a href="#">{{ $t("buy.click") }}</a>
                </p>
              </div>
              <div class="nk-modal-action-lg">
                <ul class="btn-group gx-4">
                  <li>
                    <a
                      href="#"
                      data-dismiss="modal"
                      class="btn btn-lg btn-mw btn-primary"
                      @click="onReset"
                    >
                      {{ $t("buy.return") }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- .modal-body -->
          <div class="modal-footer bg-lighter">
            <div class="text-center w-100">
              <p>
                {{ $t("buy.referEarn") }}
                <a href="#/invite" data-dismiss="modal">{{
                  $t("buy.inviteFriends")
                }}</a>
              </p>
            </div>
          </div>
        </div>
        <!-- .modal-content -->
      </div>
      <!-- .modla-dialog -->
    </div>
    <!-- .modal -->
  </q-page>
</template>
<script>
import gql from "graphql-tag";
import ConnectDialog from "../../plugins/WalletDialog/ConnectDialog";
import { getTokenTransactions, getTransactions } from "../../utils/apis";
import { CrowdsaleContract, NULL_ADDRESS } from "../../utils/contracts";

export default {
  name: "Buy",

  data() {
    return {
      sending: true,
      amount: null,
      paymentToken: {
        address: "0xED02B442b0eF5bC681c08953c5122063a497E804",
        name: "Tether USD",
        symbol: "USDT",
        logoUri:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
        min: 100.0,
        mxn: 10000.0,
        exchange: 0.3
      },
      buy: {
        address: "0xF22108A9f42EB64EF0603dE2484b506e88168084",
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
        logoUri: "",
        min: 100.0,
        exchange: 1.0
      },
      err: null
    };
  },

  mounted() {},

  computed: {
    connected: function() {
      return this.$store.state.connector.connected;
    },

    address: function() {
      return this.$store.state.connector.address;
    },

    referrals: function() {
      return this.$store.state.account.referrals;
    },

    ht: function() {
      return this.$store.state.account.ht;
    },

    usdt: function() {
      return this.$store.state.account.usdt;
    },

    eth: function() {
      return this.$store.state.account.eth;
    },

    expectPaymentAmount: function() {
      return this.amount * this.paymentToken.exchange;
    }
  },

  methods: {
    onReset() {
      this.sending = false;
      this.amount = null;
      this.err = null;
    },

    onConnect() {
      this.$q
        .dialog({ component: ConnectDialog, parent: this })
        .onOk(({ address, chainId }) => this.onBuy());
    },

    onBuy() {
      // if (!this.amount || parseFloat(this.amount) < this.buy.min) {
      //   this.sending = false;
      //   this.err = {
      //     error: this.$t("buy.invalidAmount")
      //   };
      //   return;
      // }

      this.err = null;
      this.sending = true;
      const from = this.address;
      const to = CrowdsaleContract.address;
      const token = this.paymentToken.address;
      const amount = this.expectPaymentAmount;

      this.sendTransaction({ from, to, token, amount })
        .then(tx => {
          console.log({ sendTransaction: tx });

          this.sending = false;
          this.err = null;
        })
        .catch(err => {
          this.allowance(from, token).then(allowanceHash =>
            console.log({ allowanceHash })
          );

          this.sending = false;
          this.err = err;
        });
    },

    async balanceOf(address, token) {
      const { status, message, result } = await this.$store.dispatch(
        "connector/abi",
        token
      );

      if (status === "1") {
        const abi = JSON.parse(result);
        const contract = new this.$web3.eth.Contract(abi, token);
        const decimals = await contract.methods.decimals().call();
        const balance = await contract.methods.balanceOf(address).call();
        console.log({ balance });
        return balance / Math.pow(10, decimals);
      } else {
        console.error(message);
      }
    },

    async allowance(from, token) {
      const { status, message, result } = await this.$store.dispatch(
        "connector/abi",
        token
      );

      if (status !== "1") {
        throw { error: message, message: result };
      }

      const contract = new this.$web3.eth.Contract(JSON.parse(result), token);
      const value = await contract.methods
        .allowance(from, CrowdsaleContract.address)
        .call();

      if (parseFloat(value) > 0) {
        const data = await contract.methods
          .approve(CrowdsaleContract.address, 0)
          .encodeABI();

        console.log({
          allowance: { from, token, contract: CrowdsaleContract.address, value }
        });

        try {
          var tx = {
            from,
            to: token,
            data
          };

          const gas = await this.$web3.eth.estimateGas(tx);
          tx = Object.assign(tx, { gas: this.$web3.utils.toHex(gas) });
          console.log({ allowance: tx });
          return await this.$store.dispatch("connector/sendTransaction", tx);
        } catch (err) {
          console.log(err);
          throw { error: "", message: err };
        }
      }
    },

    async approve(from, token, amount) {
      const { status, message, result } = await this.$store.dispatch(
        "connector/abi",
        token
      );

      if (status !== "1") {
        throw { error: message, message: result };
      }

      const contract = new this.$web3.eth.Contract(JSON.parse(result), token);

      const decimals = await contract.methods.decimals().call();
      const balance = await contract.methods.balanceOf(from).call();
      const balanceDecimals = parseFloat(balance / Math.pow(10, decimals));
      console.log({ balance, amount, balanceDecimals });
      if (balanceDecimals < amount) {
        throw {
          error: this.$t("transaction.insufficientBalance"),
          message: `You''ve ${balanceDecimals} ${this.paymentToken.symbol} in wallet, but need payment ${amount} ${this.paymentToken.symbol}.`
        };
      }

      const to = token;
      const value = amount * Math.pow(10, decimals) + "";
      const data = await contract.methods
        .approve(CrowdsaleContract.address, value)
        .encodeABI();

      console.log({
        approve: {
          from,
          to,
          contract: CrowdsaleContract.address,
          amount,
          value
        }
      });

      return { value };
      // try {
      //   var tx = {
      //     from,
      //     to,
      //     data
      //   };
      //   const gas = await this.$web3.eth.estimateGas(tx);
      //   tx = Object.assign(tx, { gas: this.$web3.utils.toHex(gas) });

      //   const hash = await this.$store.dispatch(
      //     "connector/sendTransaction",
      //     tx
      //   );
      //   return { hash, value };
      // } catch (err) {
      //   console.log(err);
      //   throw { error: "", message: err };
      // }
    },

    async genertaeTransaction(from, to, value) {
      const crowdsaleContract = new this.$web3.eth.Contract(
        CrowdsaleContract.abi,
        CrowdsaleContract.address
      );

      let data;

      if (this.referrals && this.referrals.length > 0) {
        if (this.referrals.length === 1) {
          this.referrals.push(NULL_ADDRESS);
        }

        console.log({ referrals: this.referrals });
        data = await crowdsaleContract.methods
          .subscribeTokensHasInviter(value, this.referrals)
          .encodeABI();
      } else {
        data = await crowdsaleContract.methods
          .subscribeTokens(value)
          .encodeABI();
      }

      console.log({ tx: { from, to, value, data } });

      try {
        var tx = {
          from,
          to,
          data
        };
        const gas = await this.$web3.eth.estimateGas(tx);

        return Object.assign(tx, { gas: this.$web3.utils.toHex(gas) });
      } catch (err) {
        console.log(err);
        throw { error: "", message: err };
      }
    },

    async sendTransaction({ from, to, token, amount }) {
      // await this.allowance(from, token);
      const { value } = await this.approve(from, token, amount);
      const tx = await this.genertaeTransaction(from, to, value);
      const hash = await this.$store.dispatch("connector/sendTransaction", tx);

      console.log({ hash });

      const tokenTx = await getTokenTransactions(from, 1);
      await this.createTransaction(tokenTx);

      return tokenTx;
    },

    createTransaction(tx) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation CreateTransaction($tx: NewTransaction!) {
              createTransaction(input: $tx) {
                blockNumber
              }
            }
          `,
          variables: {
            tx: {
              blockNumber: tx.blockNumber,
              timeStamp: tx.timeStamp,
              hash: tx.hash,
              nonce: tx.nonce,
              blockHash: tx.blockHash,
              from: tx.from,
              contractAddress: tx.contractAddress,
              to: tx.to,
              value: tx.value,
              tokenName: tx.tokenName,
              tokenSymbol: tx.tokenSymbol,
              tokenDecimal: tx.tokenDecimal,
              transactionIndex: tx.transactionIndex,
              gas: tx.gas,
              gasPrice: tx.gasPrice,
              gasUsed: tx.gasUsed,
              cumulativeGasUsed: tx.cumulativeGasUsed,
              input: tx.input,
              confirmations: tx.confirmations
            }
          },
          update: (store, { data: { createTransaction } }) => {
            console.log({ createTransaction });
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
