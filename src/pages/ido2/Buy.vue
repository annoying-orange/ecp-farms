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
                1 {{ buy.symbol }} =
                {{ exchange }}
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
              v-on:click="onBuy"
              v-if="!sending"
            >
              {{ $t("buy.continueToBuy") }}
            </a>
          </div>
          <!-- .buysell-field -->
        </form>
        <!-- .buysell-form -->
      </div>
      <!-- .buysell-block -->
    </div>
    <!-- .buysell -->
  </q-page>
</template>
<script>
import gql from "graphql-tag";
import ConnectDialog from "../../plugins/WalletDialog/ConnectDialog";
import { getTokenTransactions, getTransactions } from "../../utils/apis";
import {
  CrowdsaleContract,
  PaymentToken,
  NULL_ADDRESS
} from "../../utils/contracts";
import TransactionSuccessfully from "./components/TransactionSuccessfully";

export default {
  name: "Buy",

  data() {
    return {
      sending: false,
      amount: null,
      paymentToken: PaymentToken,
      buy: CrowdsaleContract.token,
      exchange: 0.3
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
      return this.amount * this.exchange;
    }
  },

  methods: {
    reset() {
      this.sending = false;
      this.amount = null;
    },

    onBuy() {
      if (!this.connected) {
        this.$q.notify({
          type: "negative",
          message: `Please connect to your wallet.`
        });

        return;
      }

      this.sending = true;

      const notify = this.$q.notify({
        group: false, // required to be updatable
        timeout: 0, // we want to be in control when it gets dismissed
        spinner: true,
        message: this.$t("buy.sendTransaction")
      });

      this.allocation().then(({ min, max, balance }) => {
        if (!this.expectPaymentAmount || parseFloat(this.amount) < min) {
          notify({
            type: "negative",
            timeout: 1500,
            spinner: false,
            message: `Min Allocation amount ${min} ${this.eth.symbol}`
          });
          this.sending = false;
          return;
        }

        if (parseFloat(this.amount) + balance > max) {
          notify({
            type: "negative",
            timeout: 1500,
            spinner: false,
            message: `Max Allocation no more than ${max} ${this.eth.symbol}`
          });
          this.sending = false;
          return;
        }

        const from = this.address;
        const to = CrowdsaleContract.address;
        const amount = this.expectPaymentAmount;

        this.sendTransaction({ from, to, amount })
          .then(tx => {
            console.log({ sendTransaction: tx });
            notify({ timeout: 1, spinner: false });

            this.$q
              .dialog({
                component: TransactionSuccessfully,
                parent: this,
                message: `You’ve successfully bought ${this.amount} ${this.buy.symbol} for ${this.expectPaymentAmount} ${this.paymentToken.symbol}.`
              })
              .onDismiss(() => this.reset());
          })
          .catch(err => {
            console.error(err);
            notify({
              type: "negative",
              timeout: 1500,
              spinner: false,
              message: err
            });
            this.sending = false;
          });
      });
    },

    async allocation() {
      const { token } = CrowdsaleContract;
      const contract = new this.$web3.eth.Contract(
        CrowdsaleContract.abi,
        CrowdsaleContract.address
      );

      // const fromWei = this.$web3.utils.fromWei;
      const fromWei = val => parseFloat(val) / Math.pow(10, 6);

      const info = await contract.methods.getInfo().call();
      const min = parseFloat(fromWei(info[3]));
      const max = parseFloat(fromWei(info[4]));
      const balance = await this.balanceOf(this.address, token);

      return { min, max, balance };
    },

    async balanceOf(address, token) {
      const contract = new this.$web3.eth.Contract(token.abi, token.address);
      const decimals = await contract.methods.decimals().call();
      const balance = await contract.methods.balanceOf(address).call();
      return balance / Math.pow(10, decimals);
    },

    async approve(from, amount) {
      const contract = new this.$web3.eth.Contract(
        PaymentToken.abi,
        PaymentToken.address
      );

      const decimals = await contract.methods.decimals().call();
      const balance = await contract.methods.balanceOf(from).call();
      const balanceDecimals = parseFloat(balance / Math.pow(10, decimals));

      if (balanceDecimals < amount) {
        throw {
          error: this.$t("transaction.insufficientBalance"),
          message: `You''ve ${balanceDecimals} ${this.paymentToken.symbol} in wallet, but need payment ${amount} ${this.paymentToken.symbol}.`
        };
      }

      const to = PaymentToken.address;
      const value = amount * Math.pow(10, decimals) + "";
      const allowance = await contract.methods
        .allowance(from, CrowdsaleContract.address)
        .call();

      console.log({ balance, amount, balanceDecimals, allowance });

      if (allowance === "0") {
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

        try {
          var tx = {
            from,
            to,
            data
          };
          const gas = await this.$web3.eth.estimateGas(tx);
          tx = Object.assign(tx, { gas: this.$web3.utils.toHex(gas) });
          console.log(this.$connector);
          const hash = await this.$connector.sendTransaction(tx);
          return { hash, value };
        } catch (err) {
          console.log(err);
          throw { error: "", message: err };
        }
      }

      return { hash: "", value };
    },

    async genertaeTransaction(from, to, value) {
      const crowdsaleContract = new this.$web3.eth.Contract(
        CrowdsaleContract.abi,
        CrowdsaleContract.address
      );

      try {
        let data;
        const referrals = [NULL_ADDRESS, NULL_ADDRESS];

        if (this.referrals && this.referrals.length > 0) {
          this.referrals.forEach((element, i) => {
            if (i < referrals.length) {
              referrals[i] = element;
            }
          });

          data = await crowdsaleContract.methods
            .subscribeTokensHasInviter(value, referrals)
            .encodeABI();
        } else {
          data = await crowdsaleContract.methods
            .subscribeTokens(value)
            .encodeABI();
        }

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

    async sendTransaction({ from, to, amount }) {
      const { value } = await this.approve(from, amount);
      console.log({ value });
      const tx = await this.genertaeTransaction(from, to, value);
      console.log({ tx });
      try {
        const hash = await this.$connector.sendTransaction(tx);

        console.log({ hash });

        const results = await getTokenTransactions(from, 10);
        console.log({ TokenTransactions: results });
        const tokenTx = results.filter(r => r.from === from);
        if (tokenTx.length > 0) {
          await this.createTransaction(tokenTx[0]);
        }

        return tokenTx;
      } catch (err) {
        console.log(err);
        throw { error: "", message: err };
      }
    },

    createTransaction({
      blockNumber,
      timeStamp,
      hash,
      nonce,
      blockHash,
      from,
      contractAddress,
      to,
      value,
      tokenName,
      tokenSymbol,
      tokenDecimal,
      transactionIndex,
      gas,
      gasPrice,
      gasUsed,
      cumulativeGasUsed,
      input,
      confirmations
    }) {
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
              blockNumber,
              timeStamp,
              hash,
              nonce,
              blockHash,
              from,
              contractAddress,
              to,
              value,
              tokenName,
              tokenSymbol,
              tokenDecimal,
              transactionIndex,
              gas,
              gasPrice,
              gasUsed,
              cumulativeGasUsed,
              input,
              confirmations
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
