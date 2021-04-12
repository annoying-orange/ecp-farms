<template>
  <q-btn
    unelevated
    rounded
    no-caps
    color="secondary"
    padding="sm xl"
    :label="$t('token.buy')"
    size="lg"
    @click="onBuy"
  />
</template>
<script>
import ConnectDialog from "../../../plugins/WalletDialog/ConnectDialog";
import BuyDialog from "./BuyDialog";

export default {
  name: "BuyButton",

  data() {
    return {
      openBuyDialog: false
    };
  },

  computed: {
    connected: function() {
      return this.$store.state.connector.connected;
    }
  },

  watch: {
    openBuyDialog(val) {
      if (val) {
        this.$q
          .dialog({ component: BuyDialog, parent: this })
          .onOk(() => {
            console.log("Buy Done.");
          })
          .onDismiss(() => {
            this.openBuyDialog = false;
          });
      }
    }
  },

  methods: {
    onBuy: function() {
      console.log({ connected: this.connected });
      if (this.connected) {
        this.openBuyDialog = true;
      } else {
        this.$q
          .dialog({ component: ConnectDialog, parent: this })
          .onOk(({ name, description, connector }) => {
            if (connector) {
              connector.connect(
                ({ accounts, chainId }) => {
                  this.$store.commit("connector/update", {
                    name,
                    description,
                    accounts,
                    chainId
                  });
                  this.openBuyDialog = true;
                },
                err => {
                  this.$q.notify({
                    type: "negative",
                    message: err
                  });
                }
              );
            }
          });
      }
    }
  }
};
</script>
