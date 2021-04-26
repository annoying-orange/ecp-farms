<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
    :position="$q.platform.is.mobile ? 'bottom' : 'standard'"
  >
    <div class="modal-content modal-body modal-body-lg">
      <div class="nk-block q-pa-none text-center">
        <em
          class="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-cross bg-danger"
        ></em>
        <div class="q-pt-md" v-html="message" />
        <div class="nk-modal-action mt-5">
          <a
            href="javascript:;"
            class="btn btn-lg btn-mw btn-light"
            @click="onOK"
          >
            {{ $t("transaction.return") }}
          </a>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script>
export default {
  name: "TransactionFailed",

  props: {
    // ...your custom props
    message: String
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
      this.$emit("ok");
      this.hide();
    },

    onCancel() {
      this.hide();
    }
  }
};
</script>
