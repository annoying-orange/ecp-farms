<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
    :position="$q.platform.is.mobile ? 'bottom' : 'standard'"
  >
    <div class="modal-content">
      <q-tab-panels v-model="tab" animated class="modal-body modal-body-lg">
        <q-tab-panel name="confirm" class="nk-block q-pa-none">
          <div class="nk-block-head nk-block-head-xs text-center">
            <h5 class="nk-block-title">{{ $t("transaction.confirmOrder") }}</h5>
            <div class="nk-block-text" v-html="confirmMessage"></div>
          </div>
          <div class="buysell-overview">
            <ul class="buysell-overview-list">
              <li class="buysell-overview-item">
                <div class="coin-item coin-btc">
                  <div class="coin-icon">
                    <em class="icon ni ni-sign-btc-alt"></em>
                  </div>
                  <div class="coin-info">
                    <span class="coin-name"
                      >{{ token.name }} ({{ token.symbol }})</span
                    >
                    <span class="coin-text">{{ token.address | address }}</span>
                  </div>
                </div>
              </li>
              <li class="buysell-overview-item">
                <span class="pm-title">{{ $t("transaction.amount") }}</span>
                <span class="pm-currency"> {{ amount | number }} ETS </span>
              </li>
              <li class="buysell-overview-item">
                <span class="pm-title">{{ $t("transaction.payTotal") }}</span>
                <span class="pm-currency">
                  {{ paymentAmount | number }} USDT
                </span>
              </li>
            </ul>
          </div>
          <div class="buysell-field form-action text-center" v-if="!sending">
            <div>
              <a
                href="javascript:;"
                class="btn btn-primary btn-lg"
                @click="onOK"
              >
                {{ $t("transaction.confirm") }}
              </a>
            </div>
            <div class="pt-3">
              <a href="javascript:;" class="link link-danger" @click="onCancel">
                {{ $t("transaction.cancel") }}
              </a>
            </div>
          </div>
          <div class="d-flex justify-content-center q-pa-md" v-else>
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="successfully" class="nk-modal q-pa-none text-center">
          <em
            class="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-check bg-success"
          ></em>
          <h5 class="nk-modal-title">{{ $t("transaction.successfully") }}</h5>
          <div class="nk-modal-text" v-html="successfullyMessage"></div>
          <div class="nk-modal-action-lg">
            <ul class="btn-group gx-4">
              <li>
                <a
                  href="javascript:;"
                  class="btn btn-lg btn-mw btn-primary"
                  @click="onDialogHide"
                >
                  {{ $t("transaction.ok") }}
                </a>
              </li>
            </ul>
          </div>
        </q-tab-panel>
        <q-tab-panel name="failed" class="nk-block q-pa-none text-center">
          <em
            class="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-cross bg-danger"
          ></em>
          <h5 class="nk-modal-title">
            {{ $t("transaction.unableToProcess") }}
          </h5>
          <div class="nk-modal-text">
            <p class="lead">
              {{ err }}
            </p>
          </div>
          <div class="nk-modal-action mt-5">
            <a
              href="javascript:;"
              class="btn btn-lg btn-mw btn-light"
              @click="onCancel"
            >
              {{ $t("transaction.return") }}
            </a>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-dialog>
</template>
<script>
import gql from "graphql-tag";
import {
  CrowdsaleContract,
  NULL_ADDRESS,
  Network
} from "../../../utils/contracts";

export default {
  name: "TransactionConfirm",

  data() {
    return {
      tab: "confirm",
      err: null,
      sending: false,
      tx: {}
    };
  },

  props: {
    // ...your custom props
    token: {
      address: String,
      name: String,
      symbol: String
    },
    from: String,
    to: String,
    value: String,
    rate: Number,
    referrals: Array,
    amount: Number,
    paymentAmount: Number
  },

  computed: {
    confirmMessage() {
      return `
        <div class="caption-text">
          ${this.$t("transaction.confirmMessage")
            .replace("${amount}", this.amount)
            .replace("${paymentAmount}", this.paymentAmount)}
        </div>
        <span class="sub-text-sm">${this.$t(
          "transaction.exchangeRate"
        )}: 1 ETS = ${this.rate} USDT</span>
      `;
    },

    successfullyMessage() {
      return `
        <p class="caption-text">
          ${this.$t("transaction.successfullyMessage")
            .replace("${amount}", this.amount)
            .replace("${paymentAmount}", this.paymentAmount)}
        </p>
        <p class="sub-text-sm">
          ${this.$t("buy.howReceiveToken")}
          <a href="javascript:;">${this.$t("buy.click")}</a>
        </p>
      `;
    }
  },

  methods: {
    show() {
      this.$refs.dialog.show();
    },

    hide() {
      this.$refs.dialog.hide();
    },

    successfully(tx) {
      this.sending = false;
      this.tab = "successfully";

      console.log("Transaction successfully.");
      console.log({ tx });
    },

    failed(err) {
      this.sending = false;
      this.err = err;
      this.tab = "failed";
    },

    onDialogHide() {
      this.$emit("hide");
    },

    onOK() {
      this.sending = true;
      this.sendTransaction(this.from, this.to, this.value)
        .then(tx => {
          this.successfully(tx);
          this.$store.dispatch("account/balanceOf", this.from);
        })
        .catch(err => this.failed(err));
    },

    onCancel() {
      this.hide();
    },

    async generateTransaction(from, to, value) {
      const crowdsaleContract = new this.$web3.eth.Contract(
        CrowdsaleContract.abi,
        CrowdsaleContract.address
      );

      try {
        var data;

        if (this.referrals && this.referrals.length > 0) {
          const referrals = [NULL_ADDRESS, NULL_ADDRESS];

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

        const gas = await this.$web3.eth.estimateGas(tx);
        tx = Object.assign(tx, { gas: this.$web3.utils.toHex(gas) });

        return tx;
      } catch (err) {
        console.error({ err });
        throw err;
      }
    },

    async sendTransaction(from, to, value) {
      const tx = await this.generateTransaction(from, to, value);

      try {
        const hash = await this.$connector.sendTransaction(tx);
        const tokenTx = {
          hash,
          from,
          to,
          value: this.$web3.utils.toWei(this.amount + "")
        };

        await this.submitTransaction(tokenTx);

        return tokenTx;
      } catch (err) {
        console.error({ err });
        throw err;
      }
    },

    submitTransaction({ hash, from, to, value }) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation CreateTransaction($tx: NewTransaction!) {
              createTransaction(input: $tx) {
                hash
                from
                to
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
        .catch(err => {
          console.error({ err });
          throw err;
        });
    }
  }
};
</script>
