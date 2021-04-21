<template>
  <q-card flat>
    <q-card-section class="row items-center q-pb-none">
      <q-space />
      <q-btn icon="fas fa-times-circle" flat round dense to="/" />
    </q-card-section>
    <q-card-section class="text-center q-pt-xl">
      <h5 class="title">{{ $t("referUs.title") }}</h5>
      <div class="title-sub">
        {{ $t("referUs.description") }}
      </div>
    </q-card-section>
    <q-card-section class="text-center">
      <vue-qrcode :value="link" :options="{ width: 250 }" />
    </q-card-section>
    <q-card-section class="text-center q-pt-none">
      <q-item-label>{{ link }}</q-item-label>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn flat round icon="far fa-copy" @click="onCopy" />
      <q-btn
        flat
        round
        icon="fas fa-share-alt"
        @click="shareDialog = !shareDialog"
        class="hidden"
      />
    </q-card-actions>
  </q-card>
</template>
<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  components: { VueQrcode },
  name: "Invite",

  data() {
    return {
      shareDialog: false,
      shares: [
        {
          label: "Wechat"
        },
        {
          label: "Webo"
        },
        {
          label: "Twitter"
        }
      ],
      link: `http://etherswap.1ecp.com/?#/${this.$store.state.account.code}`
    };
  },

  methods: {
    onCopy() {
      console.log(window.clipboardData);
      const el = document.createElement("textarea");
      el.value = this.link;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      this.$q.notify({
        type: "primary",
        timeout: 1000,
        message: this.$t("invite.copyLink")
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.q-card {
  background-color: #f7f8fa;
}

.row {
  margin-right: 0;
  margin-left: 0;
}
</style>
