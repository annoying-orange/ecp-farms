<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
    :position="$q.platform.is.mobile ? 'bottom' : 'standard'"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <a href="javascript:;" class="nk-quick-nav-icon" @click="onCancel">
          <em class="icon ni ni-cross"></em>
        </a>
      </q-card-section>
      <q-card-section class="text-center q-pt-none q-pb-none">
        <vue-qrcode :value="value" :options="{ width: 250 }" />
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <q-item-label>{{ value }}</q-item-label>
      </q-card-section>
      <q-card-section />
    </q-card>
  </q-dialog>
</template>
<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  components: { VueQrcode },
  name: "InviteQrcode",

  props: {
    // ...your custom props
    value: String
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

    onOK() {
      this.$emit("ok", {});
      this.hide();
    },

    onCancel() {
      this.hide();
    }
  }
};
</script>
<style lang="scss" scoped>
.q-card {
  .row {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
