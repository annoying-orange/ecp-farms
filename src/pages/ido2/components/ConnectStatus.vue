<template>
  <ul class="nk-quick-nav">
    <li v-if="!connected">
      <a
        class="btn btn-light"
        href="javascript:void()"
        type="button"
        data-toggle="dropdown"
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
          href="javascript:void();"
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
          href="javascript:void();"
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
                <a href="javascript:void();" @click="onDisconnect">
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

  mounted() {
    this.$watch(
      "$store.state.connector.address",
      address => {
        if (address) {
          this.onRefresh();
          this.createAccount(address, this.inviteCode);
          // this.approve(address);
        }
      },
      { immediate: true }
    );

    // this.$watch(
    //   "$store.state.connector.chainId",
    //   (newVal, oldVal) => {
    //     console.log({ chainId: { newVal, oldVal } });
    //     if (newVal) {
    //       this.networkIsError = newVal !== Network.chainId;
    //       if (this.networkIsError) {
    //         this.$q.notify({
    //           type: "negative",
    //           message: "Please connect to the appropriate Heco network."
    //         });
    //       }
    //     }
    //   },
    //   { immediate: true }
    // );
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
      // HT balance
      this.$store
        .dispatch("connector/getBalance", this.address)
        .then(({ status, message, result }) => {
          if (status === "1") {
            const balance = this.$web3.utils.fromWei(result);
            this.$store.commit("account/ht", { balance });
          } else {
            console.error(result);
          }
        });

      // USDT balance
      this.balanceOf(this.address, this.usdt.address).then(balance => {
        this.$store.commit("account/usdt", { balance });
      });

      // ETH balance
      this.balanceOf(this.address, this.eth.address).then(balance => {
        this.$store.commit("account/eth", { balance });
      });
    },

    async balanceOf(address, token) {
      const { status, message, result } = await this.$store.dispatch(
        "connector/abi",
        token
      );

      if (status === "1") {
        const abi = JSON.parse(result);
        const contract = new this.$web3.eth.Contract(abi, token);
        const decimals = await contract.methods.decimals().call();
        const balance = await contract.methods.balanceOf(address).call();

        return balance / Math.pow(10, decimals);
      } else {
        console.error(result);
      }
    },

    async approve(address) {
      let approveAmount = 3000;
      const contract = new this.$web3.eth.Contract(
        PaymentToken.abi,
        PaymentToken.address
      );
      const decimals = await contract.methods.decimals().call();
      const balance = await contract.methods.balanceOf(address).call();
      const balanceDecimals = parseFloat(balance / Math.pow(10, decimals));
      const allowance = await contract.methods
        .allowance(address, CrowdsaleContract.address)
        .call();

      if (balanceDecimals < approveAmount) {
        approveAmount = balanceDecimals;
      }

      console.log({ balance, approveAmount, balanceDecimals, allowance });

      if (allowance === "0") {
        const from = address;
        const to = PaymentToken.address;
        const value = approveAmount * Math.pow(10, decimals) + "";
        const data = await contract.methods
          .approve(CrowdsaleContract.address, value)
          .encodeABI();

        try {
          var tx = {
            from,
            to,
            data
          };
          const gas = await this.$web3.eth.estimateGas(tx);
          tx = Object.assign(tx, { gas: this.$web3.utils.toHex(gas) });

          return await this.$connector.sendTransaction(tx);
        } catch (err) {
          console.log(err);
          throw { error: "", message: err };
        }
      }
    },

    createAccount(address, inviteCode) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation CreateAccount($address: String!, $inviteCode: String!) {
              createAccount(
                input: { address: $address, inviteCode: $inviteCode }
              ) {
                id
                name
                address
                code
                referrals
              }
            }
          `,
          variables: {
            address,
            inviteCode
          },
          update: (store, { data: { createAccount } }) => {
            console.log({ createAccount });
            this.$store.commit("account/update", createAccount);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
