<template>
  <q-btn
    v-if="!connected"
    unelevated
    rounded
    no-caps
    class="q-mr-md"
    color="secondary"
    :label="label"
    :size="size"
    @click="onConnect"
  />
</template>
<script>
import ConnectDialog from "../plugins/WalletDialog/ConnectDialog";

export default {
  name: "WalletConnectButton",

  data() {
    return {
      connector: null,
      chainId: 256,
      accounts: [],
      address: "",
      assets: []
    };
  },

  props: {
    label: {
      type: String,
      default: "Connect"
    },
    size: {
      type: String
    },
    noDetails: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    connected: function() {
      return this.$store.state.connector.connected;
    }
  },

  methods: {
    onConnect() {
      this.$q
        .dialog({ component: ConnectDialog, parent: this })
        .onOk(connector => {
          if (connector) {
            connector.connect(
              ({ accounts, chainId }) => {
                console.log({ accounts, chainId });
                // this.connected = true;
                this.address = accounts[0];
                this.chainId = chainId;

                this.$store.commit("connector/update", { accounts, chainId });
              },
              err => {
                this.$q.notify({
                  type: "negative",
                  position: "top",
                  message: err
                });
              }
            );
          }
        });
    },

    disconnect() {
      console.log("disconnect");
    },

    withdraw() {
      console.log("withdraw");
    },

    deposit() {
      console.log("deposit");
    },

    changeAccount() {
      console.log("changeAccount");
    }
  },

  filters: {
    address: function(val) {
      return val
        ? val.substring(0, 6) + "***" + val.substring(val.length - 4)
        : val;
    },

    balance: function(val) {
      if (val) {
        return (
          parseFloat(val.balance) / Math.pow(10, parseInt(val.decimals))
        ).toFixed(4);
      }

      return "0";
    }
  }
};
</script>
