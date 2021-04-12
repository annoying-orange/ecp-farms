<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
    persistent
    :position="$q.platform.is.mobile ? 'bottom' : 'standard'"
  >
    <q-card
      :class="{ 'radius-30': !$q.platform.is.mobile }"
      class="buy-dialog-content"
    >
      <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="buy">
          <q-card flat>
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">
                {{ $t("transaction.buy") }}
              </div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class="text-center q-pt-xl">
              <q-chip>
                <q-avatar>
                  <img src="img/icon-usdt.png" />
                </q-avatar>
                UAGS
              </q-chip>
              >
              <q-chip>
                <q-avatar>
                  <q-icon name="fab fa-galactic-republic" size="28px" />
                </q-avatar>
                AGS
              </q-chip>
            </q-card-section>
            <q-card-section>
              <q-input
                stack-label
                type="number"
                placeholder="0.0"
                input-class="text-h4 text-center"
                reverse-fill-mask
                v-model="amount"
              >
              </q-input>
            </q-card-section>
            <q-card-section>
              <q-item-label
                header
                class="q-pt-none text-h6 text-secondary text-center"
              >
                ~{{ expectedAmount }} AGS
              </q-item-label>
              <div class="text-center">
                <q-chip clickable @click="amount = 100">100</q-chip>
                <q-chip clickable @click="amount = 500">500</q-chip>
                <q-chip clickable @click="amount = 2500">2500</q-chip>
                <q-chip clickable @click="amount = 10000">10000</q-chip>
              </div>
            </q-card-section>

            <q-card-actions align="center" class="q-mt-md">
              <q-btn
                unelevated
                rounded
                no-caps
                color="secondary"
                :label="$t('transaction.confirm')"
                size="lg"
                padding="sm 60px"
                @click="onConfrim"
              />
            </q-card-actions>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="send">
          <q-card flat>
            <q-card-section class="text-center">
              <q-spinner color="secondary" size="10em" :thickness="2" />
            </q-card-section>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="success">
          <q-card flat>
            <q-card-section class="row items-center q-pb-none">
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class="text-center">
              <q-avatar
                icon="far fa-check-circle"
                class="text-green"
                font-size="1em"
                size="8em"
              />
              <q-item-label class="text-h6 q-pt-md">
                {{ $t("transaction.successfully") }}
              </q-item-label>
            </q-card-section>
          </q-card>
        </q-tab-panel>
        <q-tab-panel name="fail">
          <q-card flat>
            <q-card-section class="row items-center q-pb-none">
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class="text-center">
              <q-avatar
                icon="far fa-times-circle"
                class="text-negative"
                font-size="1em"
                size="8em"
              />
              <q-item-label class="text-h6 q-pt-md">
                {{ err.message }}
              </q-item-label>
            </q-card-section>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "BuyDialog",

  data() {
    return {
      panel: "buy",
      err: {
        message: ""
      },
      amount: 0,
      min: 100,
      max: 10000,
      contract: {
        address: "0x1b248fa4374a36ed5474f8154ac4e7eeae3692b1",
        abi: []
      },
      ido: {
        address:
          this.$route.params.contract ||
          "0x49fa04CFc1fbc13d5c29358ab96D852203aD5765"
      }
    };
  },

  props: {
    // ...your custom props
    exchange: {
      type: Number,
      default: 1
    }
  },

  computed: {
    expectedAmount: function() {
      return this.amount * this.exchange;
    }
  },

  methods: {
    show() {
      this.$refs.dialog.show();
    },

    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      this.$emit("hide");
    },

    onOK() {
      this.$emit("ok", this.tx);
      this.hide();
    },

    onCancel() {
      this.hide();
    },

    onConfrim() {
      this.panel = "send";

      this.$store
        .dispatch("connector/abi", this.contract.address)
        .then(({ status, message, result }) => {
          console.log({ status, message, result });
          if (status === "1") {
            this.contract.abi = JSON.parse(result);

            const from = this.$store.state.connector.address;
            const to = this.contract;
            const amount = this.amount;

            this.balanceOf(
              this.contract.abi,
              this.contract.address,
              from
            ).then(balance => console.log({ balance }));

            this.genertaeTransaction({ from, to, amount }, (tx, err) => {
              if (err) {
                this.fail(err);
                return;
              }
              console.log(tx);

              this.$store
                .dispatch("connector/sendTransaction", tx)
                .then(data => this.success({ tx, data }))
                .catch(err => this.fail(err));
            });
          } else {
            console.error(message);
          }
        });
    },

    async balanceOf(abi, address, from) {
      var contract = new this.$web3.eth.Contract(abi, address);
      let decimals = await contract.methods.decimals().call();
      let balance = await contract.methods.balanceOf(from).call();
      console.log({ balance });
      return balance / Math.pow(10, decimals);
    },

    async genertaeTransaction({ from, to, amount }, callback) {
      const nonce = await this.$web3.eth.getTransactionCount(from);
      const gasPrice = await this.$web3.eth.getGasPrice();

      const token = new this.$web3.eth.Contract(to.abi, to.address);
      const decimals = await token.methods.decimals().call();
      const balance = this.$web3.utils.toWei(amount + ""); // amount * Math.pow(10, decimals);

      const tokenBalance = await token.methods.balanceOf(from).call();
      if (tokenBalance < balance) {
        callback(null, { message: this.$t("transaction.insufficientBalance") });
        return;
      }

      console.log({ tokenBalance, balance, decimals });

      const data = await token.methods
        .transfer(this.ido.address, balance)
        .encodeABI();

      try {
        var tx = {
          from,
          to: to.address,
          nonce,
          gasPrice,
          data
        };
        const gas = await this.$web3.eth.estimateGas(tx);
        tx = Object.assign(tx, { gas: this.$web3.utils.toHex(gas) });
        console.log({ tx });
        callback(tx, null);
      } catch (err) {
        console.error(err);
        callback(null, err);
      }
    },

    fail(err) {
      console.log({ message: "Transaction Failed", err });
      this.err = Object.assign(this.err, err);
      this.panel = "fail";
    },

    success(payload) {
      console.log({ message: "Transaction Success", payload });
      this.panel = "success";
    }
  }
};
</script>
