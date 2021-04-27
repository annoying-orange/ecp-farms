<template>
  <div class="nk-sidebar-widget d-xl-block">
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
          <a
            href="#"
            class="btn btn-lg btn-primary"
            @click="$connector.connect()"
          >
            <span>{{ $t("account.connectWallet") }}</span>
          </a>
        </li>
        <li v-else>
          <a href="#" class="btn btn-lg btn-warning" @click="onChangeWallet">
            <span>{{ $t("account.changeWallet") }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
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

  methods: {
    onChangeWallet() {
      this.$connector.disconnect().then(() => {
        this.$connector.connect();
      });
    },

    onDisconnect() {
      this.$connector.disconnect();
    }
  }
};
</script>
<style lang="scss" scoped>
.user-account-actions ul li {
  width: 100% !important;
}

.user-account-actions .btn {
  text-transform: none !important;
}
</style>
