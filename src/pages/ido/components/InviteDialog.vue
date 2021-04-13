<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
    :position="$q.platform.is.mobile ? 'bottom' : 'standard'"
  >
    <q-card :class="{ 'radius-30': !$q.platform.is.mobile }" class="q-pa-md">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="text-center q-pb-none">
        <q-item-label>{{ $t("invite.text") }}</q-item-label>
      </q-card-section>
      <q-card-section class="text-center q-pt-none q-pb-none">
        <vue-qrcode :value="value" :options="{ width: 250 }" />
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <q-item-label>{{ value }}</q-item-label>
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <q-btn flat round icon="far fa-copy" @click="onCopy" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  components: { VueQrcode },
  name: "InviteDialog",

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
    },

    onCopy() {
      console.log(window.clipboardData);
      const el = document.createElement("textarea");
      el.value = this.value;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      this.$q.notify({
        type: "positive",
        color: "white",
        textColor: "primary",
        timeout: 1000,
        message: this.$t("invite.copyLink")
      });
    }
  }
};
</script>
