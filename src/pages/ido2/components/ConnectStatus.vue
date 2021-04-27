<template>
  <ul class="nk-quick-nav">
    <li v-if="!connected">
      <a
        class="btn btn-light"
        href="javascript:;"
        @click="$connector.connect()"
      >
        {{ $t("account.connectWallet") }}
      </a>
    </li>
    <li class="dropdown user-dropdown" v-else>
      <div class="dropdown">
        <a v-if="networkIsError" class="d-md-none">
          <div class="user-toggle">
            <div class="nk-quick-nav-icon">
              <em class="icon ni ni-wifi-off text-danger"></em>
            </div>
          </div>
        </a>
        <a
          v-else
          href="javascript:;"
          class="dropdown-toggle d-md-none ml-n1"
          data-toggle="dropdown"
          @click="onRefresh"
        >
          <div class="user-toggle">
            <div class="nk-quick-nav-icon">
              <em class="icon ni ni-user-alt"></em>
            </div>
          </div>
        </a>

        <a
          v-if="networkIsError"
          class="btn btn-danger d-none d-xl-block"
          type="button"
          data-toggle="dropdown"
        >
          <em class="icon ni ni-wifi-off"></em>
          Wrong Network
        </a>
        <a
          v-else
          href="javascript:;"
          class="dropdown-toggle btn btn-light d-none d-md-block dropdown-indicator"
          data-toggle="dropdown"
          aria-expanded="false"
          @click="onRefresh"
        >
          {{ address | address }}
        </a>

        <div
          class="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1"
        >
          <div class="dropdown-inner user-card-wrap bg-lighter d-md-block">
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
                <a href="javascript:;" @click="onDisconnect">
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
import gql from "graphql-tag";

import {
  Network,
  PaymentToken,
  CrowdsaleContract
} from "../../../utils/contracts";

export default {
  name: "ConnectStatus",

  data() {
    return {
      networkIsError: false
    };
  },

  computed: {
    connected: function() {
      return this.$store.state.connector.connected;
    },

    address: function() {
      return this.$store.state.connector.address;
    },

    inviteCode: function() {
      return this.$store.state.account.inviteCode;
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
    onDisconnect() {
      this.$connector.disconnect();
    },

    onRefresh() {
      this.$store.dispatch("account/balanceOf", this.address);
    }
  }
};
</script>
