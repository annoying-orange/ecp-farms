<template>
  <ul class="nk-quick-nav">
    <li v-if="!connected">
      <div class="d-xl-none ml-n1">
        <a href="#" class="nk-nav-toggle nk-quick-nav-icon" @click="onConnect">
          <em class="icon ni ni-user-alt"></em>
        </a>
      </div>
      <a
        class="btn btn-light dropdown-indicator d-none d-xl-block"
        href="#"
        type="button"
        data-toggle="dropdown"
        @click="onConnect"
      >
        {{ $t("account.connectWallet") }}
      </a>
    </li>
    <li class="dropdown user-dropdown" v-else>
      <div class="dropdown">
        <a
          href="#"
          class="dropdown-toggle d-md-none ml-n1"
          data-toggle="dropdown"
        >
          <div class="user-toggle">
            <div class="nk-quick-nav-icon">
              <em class="icon ni ni-user-alt"></em>
            </div>
          </div>
        </a>
        <a
          href="#"
          class="dropdown-toggle btn btn-light d-none d-md-block dropdown-indicator"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          {{ address | address }}
        </a>

        <div
          class="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1"
        >
          <div
            class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block"
          >
            <div class="user-card">
              <div class="user-avatar">
                <em class="icon ni ni-user-alt"></em>
              </div>
              <div class="user-info">
                <span class="lead-text">{{ address | address }}</span>
                <span class="sub-text"> </span>
              </div>
            </div>
          </div>
          <div class="dropdown-inner user-account-info">
            <h6 class="overline-title-alt">WALLET ACCOUNT</h6>
            <div class="user-balance">
              {{ eth.balance | fixed }}
              <small class="currency currency-btc">{{ eth.symbol }}</small>
            </div>
            <div class="user-balance-sub">
              Locked
              <span
                >0.00
                <span class="currency currency-btc">{{
                  eth.symbol
                }}</span></span
              >
            </div>
          </div>
          <div class="dropdown-inner">
            <ul class="link-list">
              <li>
                <a class="dark-switch" href="#">
                  <em class="icon ni ni-moon"></em><span>Dark Mode</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown-inner">
            <ul class="link-list">
              <li>
                <a href="#">
                  <em class="icon ni ni-signout"></em><span>Disconnect</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import ConnectDialog from "../../../plugins/WalletDialog/ConnectDialog";

export default {
  name: "ConnectStatus",

  computed: {
    connected: function() {
      return this.$store.state.connector.connected;
    },

    address: function() {
      return this.$store.state.connector.address;
    },

    eth: function() {
      return this.$store.state.account.eth;
    }
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
