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
                {{ $t("buy.minimum") }}: {{ buy.min }} {{ buy.symbol }}
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
              <h5 class="title">~ {{ expectPaymentAmount }}</h5>
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
import { getTokenTransactions } from "../../utils/apis";

export default {
  name: "Buy",

  data() {
    return {
      sending: true,
      amount: null,
      paymentToken: {
        address: "0x1b248fa4374a36ed5474f8154ac4e7eeae3692b1",
        name: "Tether USD",
        symbol: "USDT",
        decimals: 6,
        logoUri:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
        min: 100.0,
        mxn: 10000.0,
        exchange: 0.3
      },
      buy: {
        address: "0x1812d24b12a5d8117eab07958bb768fe76b29ff8",
        name: "Angus",
        symbol: "AGS",
        decimals: 18,
        logoUri: "",
        min: 100.0,
        exchange: 1.0
      },
      contract: {
        address: "0x49fa04CFc1fbc13d5c29358ab96D852203aD5765"
      },
      err: null
    };
  },

  mounted() {
    const ido = "0x8139B06A8bbE42E648Dd4b112148304F0DBfA549";
    this.$store
      .dispatch("connector/abi", ido)
      .then(({ status, message, result }) => {
        const abi = JSON.parse(result);
        console.log(abi);
        const contract = new this.$web3.eth.Contract(abi, ido);
        const from = "0x59f5BDCCEE34E74cD15828bC43F1F96EB5e276B7";

        contract.methods
          .balanceOf(from)
          .call()
          .then(data => console.log({ balanceOf: data }));

        const value = this.$web3.utils.toWei("100");

        const data = contract.methods.subscribeToken(from).encodeABI();
        console.log(data);

        this.$web3.eth
          .sendTransaction({
            from,
            data
          })
          .then(receipt => {
            console.log(receipt);
          });
      });
  },

  computed: {
    connected: function() {
      return this.$store.state.connector.connected;
    },

    address: function() {
      return this.$store.state.connector.address;
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
    reset() {
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
      if (!this.amount || parseFloat(this.amount) < this.buy.min) {
        this.sending = false;
        this.err = {
          error: this.$t("buy.invalidAmount")
        };
        return;
      }

      this.err = null;
      this.sending = true;
      const from = this.address;
      const to = this.contract.address;
      const token = this.paymentToken.address;
      const amount = this.expectPaymentAmount;

      this.genertaeTransaction({ from, to, token, amount })
        .then(tx => {
          console.log(tx);

          this.$store
            .dispatch("connector/sendTransaction", tx)
            .then(hash => {
              getTokenTransactions(from, 1)
                .then(results => {
                  if (results.length > 0) {
                    this.sendTransaction(results[0]);
                  }
                  this.reset();
                  console.log({ tx, results });
                })
                .catch(err => {
                  this.sending = false;
                  this.err = err;
                });
            })
            .catch(err => {
              this.sending = false;
              this.err = err;
            });
        })
        .catch(err => {
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

    async genertaeTransaction({ from, to, token, amount }) {
      const { status, message, result } = await this.$store.dispatch(
        "connector/abi",
        token
      );

      if (status !== "1") {
        throw { error: message, message: result };
      }

      const abi = JSON.parse(result);
      const contract = new this.$web3.eth.Contract(abi, token);
      const decimals = await contract.methods.decimals().call();
      const balance = await contract.methods.balanceOf(from).call();
      const balanceNumber = parseFloat(balance / Math.pow(10, decimals));
      console.log({ balance, amount, balanceNumber });
      if (balanceNumber < amount) {
        throw {
          error: this.$t("transaction.insufficientBalance"),
          message: `You''ve ${balanceNumber} ${this.paymentToken.symbol} in wallet, but need payment ${amount} ${this.paymentToken.symbol}.`
        };
      }

      const nonce = await this.$web3.eth.getTransactionCount(from);
      const gasPrice = await this.$web3.eth.getGasPrice();
      const value = this.$web3.utils.toWei(amount + "");
      const data = await contract.methods.transfer(to, value).encodeABI();

      try {
        var tx = {
          from,
          to: token,
          nonce,
          gasPrice,
          data
        };

        const gas = await this.$web3.eth.estimateGas(tx);

        return Object.assign(tx, { gas: this.$web3.utils.toHex(gas) });
      } catch (err) {
        throw { error: "", message: err };
      }
    },

    sendTransaction(tx) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation SendTransaction($tx: NewTransaction!) {
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
