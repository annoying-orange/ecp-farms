<template>
  <q-btn
    v-if="!noDetails && connected"
    unelevated
    rounded
    no-caps
    class="q-mr-md"
    color="secondary"
    :label="address | address"
    :size="size"
  >
    <q-menu>
      <q-card flat square class="account-card q-pa-none">
        <q-card-section>
          <q-btn
            unelevated
            round
            icon="account_circle"
            color="secondary"
            size="48px"
            padding="0"
            @click="changeAccount"
          />
          <q-card-section v-if="assets.length">
            <q-item-label class="text-h5 q-pb-sm"
              >{{ assets[0] | balance }} {{ assets[0].symbol }}</q-item-label
            >
            <q-chip>{{ address | address }}</q-chip>
          </q-card-section>
        </q-card-section>
        <q-list>
          <q-item-label header
            >Your transactions will appear here...</q-item-label
          >
        </q-list>
        <!-- <q-card-actions align="center" class="q-pa-md">
          <q-btn
            unelevated
            flat
            no-caps
            icon="fas fa-unlink"
            label="Disconnect"
            color="secondary"
            @click="disconnect"
          />
        </q-card-actions> -->
      </q-card>
    </q-menu>
  </q-btn>
  <q-btn
    v-else-if="!connected"
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
// import WalletDialog from "./WalletDialog";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import getAccountAssets from "../utils/getAccountAssets";

export default {
  name: "WalletConnectButton",

  data() {
    return {
      connector: null,
      connected: true,
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

  mounted() {
    this.connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal
    });

    // Subscribe to connection events
    this.connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      console.log({ connect: payload });
      // Get provided accounts and chainId
      // const { accounts, chainId } = payload.params[0];
      // store.commit("wallet/updateWallet", {
      //   address: accounts[0],
      //   chainId,
      //   connected: true
      // });
      // store.dispatch("wallet/getAssets");

      const { chainId, accounts } = payload.params[0];
      const address = accounts[0];
      this.connected = true;
      this.chainId = chainId;
      this.accounts = accounts;
      this.address = address;

      getAccountAssets(address, chainId).then(result => (this.assets = result));
    });

    this.connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      console.log({ session_update: payload });
      // Get updated accounts and chainId
      // const { accounts, chainId } = payload.params[0];
      // store.commit("wallet/updateWallet", {
      //   address: accounts[0],
      //   chainId,
      //   connected: true
      // });
      // store.dispatch("wallet/getAssets");
    });

    this.connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      console.log({ disconnect: payload });

      // store.commit("wallet/updateWallet", { address: "0x", chainId: 0 });
    });

    if (!this.noDetails && this.connector.connected) {
      console.log("The wallet connected.");

      const { chainId, accounts } = this.connector;
      const address = accounts[0];

      this.connected = true;
      this.chainId = chainId;
      this.accounts = accounts;
      this.address = address;

      getAccountAssets(address, chainId).then(result => (this.assets = result));
    }
  },

  computed: {
    totalBalance: function() {
      return this.assets.map(
        asset =>
          parseFloat(asset.balance) / Math.pow(10, parseInt(asset.decimals))
      );
    }
  },

  methods: {
    onConnect() {
      // this.$q.dialog({ component: WalletDialog, parent: this }).onOk(wallet => {
      //   console.log(wallet);
      // });
      console.log(getAccountAssets);
      if (!this.connector.connected) {
        console.log("Waiting for create session with wallet connection ...");
        this.connector.createSession({ chainId: this.chainId });
      } else {
        console.log("The wallet connected.");
        console.log(this.connector);

        const { chainId, accounts } = this.connector;
        const address = accounts[0];

        this.connected = true;
        this.chainId = chainId;
        this.accounts = accounts;
        this.address = address;

        getAccountAssets(address, chainId).then(result => console.log(result));
      }
      //   if (typeof window.ethereum !== "undefined") {
      //     console.log("MetaMask is installed!");
      //     ethereum.request({ method: "eth_requestAccounts" });
      //   }
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
