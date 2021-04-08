<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="radius-30">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Buy CAV</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section />
      <q-card-section>
        <q-input
          filled
          stack-label
          placeholder="0.0"
          input-class="text-h5 text-center"
          v-model="amount"
        >
        </q-input>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-item-label
          header
          class="q-pt-none text-h6 text-secondary text-center"
        >
          ~{{ expectedAmount }} CAV
        </q-item-label>
        <div class="text-center">
          <q-chip icon="event">HT</q-chip> >
          <q-chip icon="bookmark">CAV</q-chip>
        </div>
      </q-card-section>

      <q-card-actions align="center" class="text-primary q-pa-md">
        <q-btn
          unelevated
          rounded
          no-caps
          color="secondary"
          label="Confrim"
          type="submit"
          padding="sm 60px"
          @click="onOK"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "BuyDialog",

  data() {
    return {
      amount: 0,
      contract: {
        address: "0x878E5f1D36E83C12542590FEB99257f822D23411",
        abi: []
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
      this.$emit("ok");
      //   this.hide();

      const from = this.$store.state.connector.address;
      const to = this.contract;
      const amount = this.amount;

      this.genertaeTransaction({ from, to, amount }, (tx, err) => {
        if (err) {
          this.$q.notify({
            type: "negative",
            position: "top",
            message: err.message
          });
          return;
        }

        this.$store
          .dispatch("connector/sendTransaction", tx)
          .then(data => {
            // blockHash: "0x4b78e5fadf4a32e4270bcbd96421fb2fde65d896287668692cb9ef9cca4394bb"
            console.log({ tx, data });
          })
          .catch(err => {
            this.$q.notify({
              type: "negative",
              position: "top",
              message: err.message
            });
            this.hide();
          });
      });
      // this.$store
      //   .dispatch("connector/abi", this.contract.address)
      //   .then(({ status, message, result }) => {
      //     console.log({ status, message, result });
      //     if (status === "1") {
      //       this.contract.abi = JSON.parse(result);

      //       const from = this.$store.state.connector.address;
      //       const to = this.contract;
      //       const amount = this.amount;

      //       this.genertaeTransaction({ from, to, amount }, (tx, err) => {
      //         if (err) {
      //           this.$q.notify({
      //             type: "negative",
      //             message: err.message
      //           });
      //           return;
      //         }
      //         console.log(tx);

      //         this.$store
      //           .dispatch("connector/sendTransaction", tx)
      //           .then(() => console.log("Send Transaction."));

      //         //   ethereum
      //         //     .request({
      //         //       method: "eth_sendTransaction",
      //         //       params: [tx]
      //         //     })
      //         //     .then(result => {
      //         //       console.log(result);
      //         //       // The result varies by by RPC method.
      //         //       // For example, this method will return a transaction hash hexadecimal string on success.
      //         //     })
      //         //     .catch(err => {
      //         //       console.log(err);
      //         //       // If the request fails, the Promise will reject with an error.
      //         //     });
      //       });
      //     } else {
      //       console.error(message);
      //     }
      //   });
    },

    onCancel() {
      this.hide();
    },

    async genertaeTransaction({ from, to, amount }, callback) {
      // var contract = new this.$web3.eth.Contract(to.abi, to.address);

      const value = this.$web3.utils.toWei(amount);
      const nonce = await this.$web3.eth.getTransactionCount(from);
      const gasPrice = await this.$web3.eth.getGasPrice();
      const data = ""; //await contract.methods.payable().encodeABI();

      try {
        var tx = {
          from,
          to: to.address,
          nonce,
          gasPrice,
          value,
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
    }
  }
};
</script>
