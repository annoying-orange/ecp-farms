<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="radius-30">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Connect to a wallet</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md q-gutter-md wallet-container">
        <wallet-item
          v-for="c in connectors"
          :key="c.name"
          :name="c.name"
          :icon="c.icon"
          @connect="onOK(c.connector)"
        />
      </q-card-section>

      <q-card-actions align="center" class="text-primary">
        <div class="q-pa-md">
          <q-btn
            flat
            no-caps
            label="Learn how to connect"
            icon="help"
            type="a"
            target="_blank"
            href="https://ethereum.org/zh/wallets"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import connectors from "./connectors";
import WalletItem from "./WalletItem";

export default {
  components: { WalletItem },
  name: "WalletDialog",

  data() {
    return {
      connectors
    };
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

    onOK(connector) {
      this.$emit("ok", connector);
      this.hide();
    },

    onCancel() {
      this.hide();
    }
  }
};
</script>
