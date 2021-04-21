<template>
  <div>
    <q-card flat class="transparent">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="fas fa-times-circle" flat round dense to="/" />
      </q-card-section>
      <q-card-section class="text-center q-pt-xl">
        <q-item-label>{{ $t("referUs.title") }}</q-item-label>
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
    <q-dialog v-model="shareDialog" position="bottom">
      <q-card class="q-pb-md">
        <q-list separator>
          <q-item
            clickable
            class="text-center"
            v-for="share in shares"
            :key="share.label"
            @click="shareDialog = false"
          >
            <q-item-section>
              {{ share.label }}
            </q-item-section>
          </q-item>
        </q-list>
        <q-card-section />
      </q-card>
    </q-dialog>
  </div>
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
      link: "https://etherswap.1ecp.com/#Y9mT1c8K"
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
