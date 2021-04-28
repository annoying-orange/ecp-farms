<template>
  <q-dialog ref="dialog" @hide="onDialogHide" class="connect-dialog">
    <q-card v-if="connecting">
      <q-card-section class="q-pt-md text-center">
        <q-spinner
          color="secondary"
          size="5em"
          :thickness="2"
          class="q-mb-lg"
        />
        <p class="caption-text">{{ connectDescription }}</p>
      </q-card-section>
    </q-card>
    <q-card v-else>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t("account.connectWallet") }}</div>
        <q-space />
        <a href="javascript:;" class="nk-quick-nav-icon" @click="onCancel">
          <em class="icon ni ni-cross"></em>
        </a>
      </q-card-section>
      <q-card-section class="q-pt-md q-gutter-md wallet-container">
        <wallet-item
          v-for="c in connectors"
          :key="c.name"
          :name="c.name"
          :icon="c.icon"
          @connect="onOK(c)"
        />
      </q-card-section>

      <q-card-actions align="center" class="text-primary">
        <div class="q-pa-md full-width">
          <q-btn
            flat
            no-caps
            :label="$t('wallet.howToConnect')"
            icon="help"
            type="a"
            target="_blank"
            href="https://ethereum.org/zh/wallets"
            class="full-width text-center"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import gql from "graphql-tag";
import connectors from "./connectors";
import WalletItem from "./WalletItem";
import { CrowdsaleContract, PaymentToken } from "../../utils/contracts";

export default {
  components: { WalletItem },
  name: "WalletDialog",

  data() {
    return {
      connecting: false,
      connectDescription: "",
      connectors
    };
  },

  computed: {
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
    show() {
      this.$refs.dialog.show();
    },

    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      this.$emit("hide");
    },

    onOK(target) {
      const { name, description, connector } = target;
      console.log({ name, description, connector });
      if (connector) {
        this.connecting = true;
        this.connectDescription = description;

        connector.connect(
          ({ accounts, chainId }) => {
            const address = accounts[0];

            this.connecting = false;
            this.$emit("ok", { address, chainId });
            this.hide();

            this.update(address)
              .then(() => {
                this.$store.commit("connector/update", {
                  name,
                  description,
                  accounts,
                  chainId
                });
              })
              .catch(err => {
                throw err;
              });

            this.approve(
              connector,
              address,
              CrowdsaleContract.address
            ).then(approveHash => console.log({ approveHash }));
          },
          err => {
            this.connecting = false;

            this.$q.notify({
              type: "negative",
              message: err
            });
          }
        );
      }
    },

    onCancel() {
      this.hide();
    },

    async update(address) {
      this.create(address, this.inviteCode);

      // HT balance
      const { status, message, result } = await this.$store.dispatch(
        "connector/getBalance",
        address
      );
      if (status === "1") {
        this.$store.commit("account/ht", {
          balance: this.$web3.utils.fromWei(result)
        });
      } else {
        console.error(message);
      }

      // USDT balance
      // const usdtBalance = ;
      this.$store.commit("account/usdt", {
        balance: await this.balanceOf(address, this.usdt.address)
      });

      // ETH balance
      this.$store.commit("account/eth", {
        balance: await this.balanceOf(address, this.eth.address)
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
        console.error(message);
      }
    },

    async approve(connector, from) {
      let approveAmount = 3000;
      const contract = new this.$web3.eth.Contract(
        PaymentToken.abi,
        PaymentToken.address
      );
      const decimals = await contract.methods.decimals().call();
      const balance = await contract.methods.balanceOf(from).call();
      const balanceDecimals = parseFloat(balance / Math.pow(10, decimals));
      const allowance = await contract.methods
        .allowance(from, CrowdsaleContract.address)
        .call();

      if (balanceDecimals < approveAmount) {
        approveAmount = balanceDecimals;
      }

      console.log({ balance, approveAmount, balanceDecimals, allowance });

      if (allowance === "0") {
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

          return await connector.sendTransaction(tx);
        } catch (err) {
          console.log(err);
          throw { error: "", message: err };
        }
      }
    },

    create(address, inviteCode) {
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
.connect-dialog {
  .q-card {
    min-width: 300px;
  }

  .row {
    margin-left: inherit;
    margin-right: inherit;
  }

  .q-gutter-x-md > *,
  .q-gutter-md > * {
    margin-left: 16px;
  }
}

.justify-center,
.flex-center {
  justify-content: center !important;
}
</style>
