<template>
  <ul class="nk-quick-nav">
    <li v-if="!connected">
      <a href="#">
        <div class="user-avatar sm">
          <em class="icon ni ni-user-alt"></em>
        </div>
      </a>
      <a
        class="btn btn-primary dropdown-indicator d-none d-md-block"
        href="#"
        type="button"
        data-toggle="dropdown"
        @click="onConnect"
        >Connect Wallet
      </a>
    </li>
    <li class="dropdown user-dropdown" v-else>
      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <div class="user-toggle">
          <div class="user-avatar sm">
            <em class="icon ni ni-user-alt"></em>
          </div>
          <div class="user-info d-none d-md-block">
            <div class="user-status user-status-unverified">
              {{ eth.balance | fixed }}
              <small class="currency currency-btc">{{ eth.symbol }}</small>
            </div>
            <div class="user-name dropdown-indicator">
              {{ address | address }}
            </div>
          </div>
        </div>
      </a>
      <div
        class="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1"
      >
        <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
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
              <span class="currency currency-btc">{{ eth.symbol }}</span></span
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
    onConnect() {
      this.$q
        .dialog({ component: ConnectDialog, parent: this })
        .onOk(({ name, description, connector }) => {
          console.log({ name, description, connector });
          if (connector) {
            connector.connect(
              ({ accounts, chainId }) => {
                console.log({ accounts, chainId });
                const address = accounts[0];

                this.$store.commit("connector/update", {
                  name,
                  description,
                  accounts,
                  chainId
                });

                // HT balance
                this.$store
                  .dispatch("connector/getBalance", address)
                  .then(({ status, message, result }) => {
                    if (status === "1") {
                      this.$store.commit("account/ht", {
                        balance: this.$web3.utils.fromWei(result)
                      });
                    } else {
                      console.error(message);
                    }
                  });

                // USDT balance
                this.balanceOf(address, this.usdt.address).then(balance =>
                  this.$store.commit("account/usdt", { balance })
                );

                // ETH balance
                this.balanceOf(address, this.eth.address).then(balance =>
                  this.$store.commit("account/eth", { balance })
                );
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
        console.log({ balance });
        return balance / Math.pow(10, decimals);
      } else {
        console.error(message);
      }
    }
  }
};
</script>
