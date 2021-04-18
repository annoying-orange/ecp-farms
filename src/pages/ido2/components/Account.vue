<template>
  <div class="nk-sidebar-widget d-none d-xl-block">
    <div class="user-account-info between-center">
      <div class="user-account-main">
        <h6 class="overline-title-alt">{{ $t("account.availableBalance") }}</h6>
        <div class="user-balance">
          {{ ht.balance | fixed }}
          <small class="currency currency-btc">{{ ht.symbol }}</small>
        </div>
        <div class="user-balance-alt">
          {{ usdt.balance | fixed }}
          <span class="currency currency-btc">{{ usdt.symbol }}</span>
        </div>
      </div>
      <a
        href="https://hecoinfo.com/chart/htprice"
        target="_blank"
        class="btn btn-white btn-icon btn-light"
        ><em class="icon ni ni-line-chart"></em
      ></a>
    </div>
    <ul class="user-account-data gy-1">
      <li>
        <div class="user-account-label">
          <span class="sub-text">{{ $t("account.profits7d") }}</span>
        </div>
        <div class="user-account-value">
          <span class="lead-text">
            + 0.0526
            <span class="currency currency-btc">BTC</span>
          </span>
          <span class="text-success ml-2">
            3.1% <em class="icon ni ni-arrow-long-up"></em>
          </span>
        </div>
      </li>
      <li>
        <div class="user-account-label">
          <span class="sub-text">{{ $t("account.depositInOrders") }}</span>
        </div>
        <div class="user-account-value">
          <span class="sub-text">
            {{ eth.balance | fixed }}
            <span class="currency currency-btc">{{ eth.symbol }}</span>
          </span>
        </div>
      </li>
    </ul>
    <div class="user-account-actions">
      <ul class="g-3">
        <li v-if="!connected">
          <a href="#" class="btn btn-lg btn-primary" @click="onConnect">
            <span>{{ $t("account.connectWallet") }}</span>
          </a>
        </li>
        <li v-else>
          <a href="#" class="btn btn-lg btn-warning">
            <span>{{ $t("account.changeWallet") }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
import ConnectDialog from "../../../plugins/WalletDialog/ConnectDialog";

export default {
  name: "Account",

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
    }
  },

  mounted() {
    console.log(this.usdt);
  },

  methods: {
    onConnect() {
      this.$q
        .dialog({ component: ConnectDialog, parent: this })
        .onOk(({ address, chainId }) => console.log({ address, chainId }));
    }
  }
};
</script>
<style lang="scss" scoped>
.user-account-actions ul li {
  width: 100% !important;
}
</style>
