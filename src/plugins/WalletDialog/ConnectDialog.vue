<template>
  <q-dialog ref="dialog" @hide="onDialogHide" class="connect-dialog">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Connect to a wallet</div>
        <q-space />
        <a href="#" class="nk-quick-nav-icon" @click="onCancel">
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
            label="Learn how to connect"
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

    onOK(target) {
      this.$emit("ok", target);
      this.hide();
    },

    onCancel() {
      this.hide();
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
