<template>
  <q-page class="nk-content-body">
    <div class="buysell wide-xs m-auto">
      <!-- .buysell-nav -->
      <div class="buysell-title text-center">
        <h5 class="title">{{ $t("buy.title") }}</h5>
      </div>
      <!-- .buysell-title -->
      <div class="buysell-block">
        <form class="buysell-form">
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
                href="javascript:;"
                class="buysell-cc-choosen dropdown-indicator"
                data-toggle="dropdown"
              >
                <div class="coin-item coin-btc">
                  <div class="coin-icon">
                    <img class="icon" src="/assets/coins/chx.png" />
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
                    <a
                      href="javascript:;"
                      class="buysell-cc-opt"
                      data-currency="btc"
                    >
                      <div class="coin-item coin-btc">
                        <div class="coin-icon">
                          <img class="icon" src="/assets/coins/chx.png" />
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
                ref="amount"
                placeholder="0.000000"
                v-model="amount"
                v-on:focus="amount = null"
                :class="{ error: $v.amount.required && $v.amount.$invalid }"
              />
              <div class="form-dropdown">
                <div class="text">{{ buy.symbol }}<span>/</span></div>
                <div class="dropdown">
                  <a
                    href="javascript:;"
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
                      <li><a href="javascript:;">USDT</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-note-group">
              <span class="buysell-min form-note-alt">
                {{ $t("buy.minimum") }}: {{ minAllocation }}
                {{ buy.symbol }}
              </span>
              <span class="buysell-rate form-note-alt">
                1 {{ buy.symbol }} =
                {{ rate }}
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

          <div class="buysell-field form-action" v-if="status === '1'">
            <a
              href="javascript:;"
              class="btn btn-lg btn-block btn-primary"
              v-on:click="onConfirm"
              v-if="!sending"
            >
              {{ $t("buy.continueToBuy") }}
            </a>
            <div class="d-flex justify-content-center" v-if="sending">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
          <div v-else class="alert alert-fill alert-primary text-center h6">
            {{ $t(allStatus[status]) }}
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
import { required, decimal } from "vuelidate/lib/validators";
import ConnectDialog from "../../plugins/WalletDialog/ConnectDialog";
import { getTokenTransactions, getTransactions } from "../../utils/apis";
import {
  CrowdsaleContract,
  PaymentToken,
  NULL_ADDRESS,
  Network
} from "../../utils/contracts";
import TransactionSuccessfully from "./components/TransactionSuccessfully";
import TransactionConfirm from "./components/TransactionConfirm";
import TransactionFailed from "./components/TransactionFailed";

const ERROR = {
  INVALID_AMOUNT: "error.invalidAmount",
  INSUFFICIENT_BALANCE: "error.insufficientBalance"
};

const allStatus = {
  "0": "status.inactive",
  "1": "status.active",
  "2": "status.pause",
  "3": "status.close"
};

export default {
  name: "Buy",

  data() {
    return {
      sending: false,
      amount: null,
      minAllocation: 1,
      rate: 0.3,
      paymentToken: PaymentToken,
      buy: CrowdsaleContract.token,
      status: "0",
      allStatus
    };
  },

  validations: {
    amount: {
      required,
      decimal
    }
  },

  mounted() {
    this.info().then(({ min, rate, status }) => {
      this.minAllocation = min;
      this.rate = rate;
      this.status = status;
    });
  },

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
      return this.$v.amount.$invalid ? 0 : this.amount * this.rate;
    }
  },

  methods: {
    reset() {
      this.sending = false;
      this.amount = null;
    },

    fromWei(value) {
      return this.$web3.utils.fromWei(value);
    },

    onConfirm() {
      if (!this.connected) {
        this.$connector.connect();
        return;
      }

      if (this.$v.$invalid) {
        this.$refs.amount.focus();
        return;
      }

      const amount = parseFloat(this.amount);
      const paymentAmount = this.expectPaymentAmount;

      this.sending = true;

      this.approve(this.address, amount, paymentAmount)
        .then(value => {
          const token = this.buy;
          const from = this.address;
          const to = CrowdsaleContract.address;
          const rate = this.rate;
          const referrals = this.referrals;

          this.$q
            .dialog({
              component: TransactionConfirm,
              parent: this,
              token,
              from,
              to,
              value,
              rate,
              referrals,
              amount,
              paymentAmount
            })
            .onDismiss(() => this.reset());
        })
        .catch(err => {
          this.sending = false;
          console.log({ err });

          this.$q
            .dialog({
              component: TransactionFailed,
              parent: this,
              message: `
                <h5 class="nk-modal-title">${this.$t(err.error)}</h5>
                <div class="nk-modal-text">
                  <p class="lead">${err.message}</p>
                </div>
              `
            })
            .onDismiss(() => this.reset());
        });
    },

    async info() {
      const contract = new this.$web3.eth.Contract(
        CrowdsaleContract.abi,
        CrowdsaleContract.address
      );

      const fromWei = this.$web3.utils.fromWei;
      const info = await contract.methods.getInfo().call();

      console.log({ info });

      return {
        allocatedTime: 0, //parseInt(info[0]),
        expires: 0, //parseInt(info[1]),
        rate: parseFloat(fromWei(info[2])),
        min: parseFloat(fromWei(info[3])),
        max: parseFloat(fromWei(info[4])),
        total: parseFloat(fromWei(info[5])),
        amount: parseFloat(fromWei(info[6])),
        status: "0" //info[7] // INACTIVE = 0, ACTIVE = 1, PAUSE = 2, CLOSE = 3
      };
    },

    async balanceOf(address, token) {
      const contract = new this.$web3.eth.Contract(token.abi, token.address);
      const decimals = await contract.methods.decimals().call();
      const balance = await contract.methods.balanceOf(address).call();
      return balance / Math.pow(10, decimals);
    },

    async allocation() {
      const { token } = CrowdsaleContract;
      const { min, max, status } = await this.info();
      const balance = await this.balanceOf(this.address, token);

      console.log({ allocation: { min, max, status, balance } });

      return { min, max, status, balance };
    },

    async approve(from, amount, paymentAmount) {
      const allocation = await this.allocation();

      if (allocation.status !== "1") {
        throw {
          error: this.$t(this.allStatus[allocation.status]),
          message: ""
        };
      }

      if (allocation.min > amount) {
        throw {
          error: ERROR.INVALID_AMOUNT,
          message: this.$t("transaction.minAllocationMessage").replace(
            "${min}",
            allocation.min
          )
        };
      }

      if (allocation.max < allocation.balance + amount) {
        throw {
          error: ERROR.INVALID_AMOUNT,
          message: this.$t("transaction.maxAllocationMessage")
            .replace("${max}", allocation.max)
            .replace("${balance}", allocation.balance)
        };
      }

      const contract = new this.$web3.eth.Contract(
        PaymentToken.abi,
        PaymentToken.address
      );

      const decimals = await contract.methods.decimals().call();
      const balance = await contract.methods.balanceOf(from).call();
      const decimalBalance = parseFloat(balance / Math.pow(10, decimals));

      if (decimalBalance < paymentAmount) {
        throw {
          error: ERROR.INSUFFICIENT_BALANCE,
          message: this.$t("transaction.insufficientBalanceMessage")
            .replace("${balance}", decimalBalance)
            .replace("${paymentAmount}", paymentAmount)
        };
      }

      const value = paymentAmount * Math.pow(10, decimals) + "";

      var allowance = await contract.methods
        .allowance(from, CrowdsaleContract.address)
        .call();

      if (parseFloat(allowance / Math.pow(10, decimals)) < paymentAmount) {
        const to = PaymentToken.address;
        const data = await contract.methods
          .approve(CrowdsaleContract.address, value)
          .encodeABI();

        try {
          var tx = {
            from,
            to,
            data
          };

          const gas = await this.$web3.eth.estimateGas(tx);
          tx = Object.assign(tx, { gas: this.$web3.utils.toHex(gas) });
          const hash = await this.$connector.sendTransaction(tx);

          console.log({ approve: { hash, tx } });

          allowance = value;
          // const sginTx = await this.$connector.signTransaction(tx);
          // console.log({ sginTx });
        } catch (err) {
          console.log(err);
          throw err;
        }
      }

      console.log({ approve: { allowance, value } });

      return value;
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
          console.log(
            `methods.subscribeTokensHasInviter(${value}, ${referrals})`
          );
          data = await crowdsaleContract.methods
            .subscribeTokensHasInviter(value, referrals)
            .encodeABI();
        } else {
          console.log(`methods.subscribeTokens(${value})`);
          data = await crowdsaleContract.methods
            .subscribeTokens(value)
            .encodeABI();
        }

        const customChain = {
          name: Network.name,
          networkId: Network.networkId,
          chainId: Network.chainId
        };

        var tx = {
          from,
          to,
          data,
          common: { customChain }
        };
        console.log(tx);
        const gas = await this.$web3.eth.estimateGas(tx);

        return Object.assign(tx, { gas: this.$web3.utils.toHex(gas) });
      } catch (err) {
        console.log(err);
        throw err;
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

        // const results = await getTokenTransactions(from, 10);
        // console.log({ TokenTransactions: results });
        // const tokenTx = results.filter(r => r.from === from);
        // if (tokenTx.length > 0) {
        //   await this.createTransaction(tokenTx[0]);
        // }

        return hash;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    submitTransaction({ hash, from, to, value }) {
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
              hash,
              from,
              to,
              value
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
