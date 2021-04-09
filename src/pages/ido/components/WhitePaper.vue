<template>
  <q-card flat class="white-paper">
    <q-card-section>
      <q-item-label class="brand-name text-h4 text-secondary"
        >EtherSwap Token</q-item-label
      >
      <q-item-label class="text-h5 q-pt-md">
        {{ $t("ido.whitePaperTitle") }}
      </q-item-label>
      <q-item-label class="q-pt-md text-grey">
        {{ $t("ido.whitePaperDescription") }}
      </q-item-label>
    </q-card-section>
    <q-card-section class="q-mt-sm">
      <q-btn
        rounded
        unelevated
        no-caps
        color="secondary"
        :label="$t('ido.whitePaper')"
        class="text-weight-bold"
        size="lg"
        @click="onWhitePaper"
      />
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: "WhitePaper",

  mounted() {},

  methods: {
    async genertaeTransaction({ from, to, amount }, callback) {
      const nonce = await this.$web3.eth.getTransactionCount(from);
      const gasPrice = await this.$web3.eth.getGasPrice();

      try {
        const value = this.$web3.utils.toWei(amount);
        var tx = {
          from,
          to,
          nonce,
          gasPrice,
          value
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
    onWhitePaper() {
      const from = ethereum.selectedAddress;
      const to = "0x878E5f1D36E83C12542590FEB99257f822D23411";
      const amount = "0.01";

      ethereum.enable().then(e => {
        console.log(`Ethereum enabled: ${e}`);

        this.genertaeTransaction({ from, to, amount }, (tx, err) => {
          if (err) {
            this.$q.notify({
              type: "negative",
              message: err.message
            });
            return;
          }
          console.log(tx);

          ethereum
            .request({
              method: "eth_sendTransaction",
              params: [tx]
            })
            .then(result => {
              console.log(result);
              // The result varies by by RPC method.
              // For example, this method will return a transaction hash hexadecimal string on success.
            })
            .catch(err => {
              console.log(err);
              // If the request fails, the Promise will reject with an error.
            });
        });
      });
    }
  }
};
</script>
<style lang="sass" scoped>
.white-paper
    color: white
    background: transparent
    padding-top: 60px

    .brand-name
        font-weight: 900
    .q-btn
        width: 50%
</style>
