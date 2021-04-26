<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
    :position="$q.platform.is.mobile ? 'bottom' : 'standard'"
  >
    <div class="modal-content">
      <a href="javascript:;" class="nk-quick-nav-icon close" @click="onCancel">
        <em class="icon ni ni-cross"></em>
      </a>
      <div class="modal-body modal-body-lg text-center">
        <div class="nk-modal">
          <em
            class="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-check bg-success"
          ></em>
          <h4 class="nk-modal-title">{{ $t("buy.successfully") }}</h4>
          <div class="nk-modal-text">
            <p class="caption-text">
              {{ message }}
            </p>
            <p class="sub-text-sm">
              {{ $t("buy.howReceiveToken") }}
              <a href="#">{{ $t("buy.click") }}</a>
            </p>
          </div>
          <div class="nk-modal-action-lg">
            <ul class="btn-group gx-4">
              <li>
                <a
                  href="#"
                  data-dismiss="modal"
                  class="btn btn-lg btn-mw btn-primary"
                  @click="onOK"
                >
                  {{ $t("buy.return") }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- .modal-body -->
      <div class="modal-footer bg-lighter">
        <div class="text-center w-100">
          <p>
            {{ $t("buy.referEarn") }}
            <a href="#/invite" data-dismiss="modal">{{
              $t("buy.inviteFriends")
            }}</a>
          </p>
        </div>
      </div>
    </div>
    <!-- .modal-content -->
  </q-dialog>
</template>
<script>
export default {
  name: "TransactionSuccessfully",

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
      this.$emit("ok", {});
      this.hide();
    },

    onCancel() {
      this.hide();
    }
  }
};
</script>
