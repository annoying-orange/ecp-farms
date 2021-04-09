<template>
  <q-card flat class="transparent text-white">
    <q-card-section>
      <q-avatar>
        <q-icon name="fab fa-galactic-republic" size="xl" />
      </q-avatar>
      <q-item-label class="text-h5 q-pt-md text-secondary">
        {{ name }}
      </q-item-label>
      <q-item-label class="text-h6 q-pt-sm" lines="1">
        {{ address }}
      </q-item-label>
    </q-card-section>
    <q-card-section class="q-mt-sm">
      <div class="q-gutter-md">
        <wallet-connect-button
          :no-details="true"
          size="lg"
          label="Connect Wallet"
        />
        <q-btn
          v-if="connected"
          unelevated
          rounded
          no-caps
          color="secondary"
          padding="sm xl"
          :label="$t('token.buy')"
          size="lg"
          @click="onBuy"
        />
        <q-btn
          rounded
          outline
          no-caps
          :label="$t('token.viewHecoInfo')"
          size="lg"
          type="a"
          target="_blank"
          href="https://testnet.hecoinfo.com/address/0xfe77358a99ea08dc2c2b1598bfafd42c796a59bd"
        />
      </div>
    </q-card-section>
    <q-card-section class="tips q-mt-sm">
      {{ $t("token.description") }}
    </q-card-section>
  </q-card>
</template>
<script>
import WalletConnectButton from "../../../components/WalletConnectButton";
import BuyDialog from "./BuyDialog";

export default {
  components: { WalletConnectButton },
  name: "TokenCard",

  data() {
    return {
      name: "Caviar Token",
      address: "0xfe77358a99ea08dc2c2b1598bfafd42c796a59bd"
    };
  },

  computed: {
    connected: function() {
      return this.$store.state.connector.connected;
    }
  },

  methods: {
    onBuy: function() {
      console.log(this);
      this.$q.dialog({ component: BuyDialog, parent: this }).onOk(() => {
        console.log("Buy Done.");
      });
    }
  }
};
</script>
<style lang="sass" scoped>
.tips
    font-size: 14px
    font-family: PingFangSC-Regular, PingFang SC
    font-weight: 400
    color: #ffffff
    line-height: 25px
</style>
