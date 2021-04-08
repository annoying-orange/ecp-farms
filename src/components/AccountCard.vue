<template>
  <q-btn
    v-if="connected"
    unelevated
    rounded
    no-caps
    class="q-mr-md"
    color="secondary"
    :label="address | address"
  >
    <q-menu @show="onShow">
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
          <div class="q-mt-md">
            <q-item-label class="text-h5 q-pb-sm" v-if="assets.length">
              {{ assets[0].balance | balance }} {{ assets[0].symbol }}
            </q-item-label>
            <q-chip>{{ address | address }}</q-chip>
          </div>
        </q-card-section>
        <q-list>
          <q-item-label header>
            {{
              transactions.length > 0
                ? "Transactions"
                : "Your transactions will appear here..."
            }}
          </q-item-label>
          <q-item v-for="t in transactions" :key="t.blockHash">
            <q-item-section avatar>
              <q-avatar
                :icon="isIn(t.to) ? 'arrow_back' : 'arrow_forward'"
                size="sm"
                color="secondary"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" class="text-weight-medium">
                {{ isIn(t.to) ? t.from : t.to | address }}
              </q-item-label>
              <q-item-label caption>
                {{ t.timeStamp | ago }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1" class="text-weight-medium">
                {{ isIn(t.to) ? "" : "-" }}{{ t.value | fromWei }}
                <small>HT</small>
              </q-item-label>
              <q-item-label caption> Block: {{ t.blockNumber }} </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-menu>
  </q-btn>
</template>
<script>
import getAccountAssets from "../utils/getAccountAssets";

export default {
  name: "AccountCard",

  data() {
    return {
      assets: [],
      transactions: []
    };
  },

  computed: {
    connected: function() {
      return this.$store.state.connector.connected;
    },

    address: function() {
      return this.$store.state.connector.address;
    },

    totalBalance: function() {
      return this.assets.map(
        asset =>
          parseFloat(asset.balance) / Math.pow(10, parseInt(asset.decimals))
      );
    }
  },

  methods: {
    changeAccount() {},

    onShow() {
      const { address, chainId } = this.$store.state.connector;
      this.$store
        .dispatch("connector/getBalance", address)
        .then(({ message, result, status }) => {
          console.log({ message, result, status });
          if (status === "1") {
            this.assets.length = 0;
            this.assets.push({
              balance: result,
              symbol: "HT",
              decimals: 18
            });
          } else {
            console.error(message);
          }
        });

      this.$store
        .dispatch("connector/getTransactions", address)
        .then(({ message, result, status }) => {
          console.log({ message, result, status });
          if (status === "1") {
            this.transactions = result;
          } else {
            console.error(message);
          }
        });
    },

    isIn(to) {
      return to === this.address.toLowerCase();
    }
  },

  filters: {
    address: function(val) {
      return val
        ? val.substring(0, 6) + "***" + val.substring(val.length - 4)
        : val;
    },

    ago: function(val) {
      var diff = Math.round(new Date().getTime() / 1000 - val);
      if (diff < 60) {
        return `${diff} secs ago`;
      } else if (diff < 60 * 60) {
        return `${Math.round(diff / 60)} mins ago`;
      } else if (diff < 60 * 60 * 24) {
        return `${Math.round(diff / (60 * 60))} hours ago`;
      } else {
        return `${Math.round(diff / (60 * 60 * 24))} days ago`;
      }
    }
  }
};
</script>
