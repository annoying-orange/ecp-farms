<template>
  <q-card flat class="transparent text-white q-pa-md">
    <q-card-section>
      <q-item class="q-pl-none">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="fab fa-galactic-republic" size="lg" />
          </q-avatar>
        </q-item-section>
        <q-item-section top>
          <q-item-label class="text-h4 text-secondary">
            {{ name }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item-label class="text-h6 q-pt-sm" lines="1">
        {{ address }}
      </q-item-label>
    </q-card-section>
    <q-card-section class="q-mt-sm">
      <div class="q-gutter-md">
        <buy-button />
        <q-btn
          rounded
          outline
          no-caps
          :label="$t('token.viewHecoInfo')"
          size="lg"
          type="a"
          target="_blank"
          href="https://testnet.hecoinfo.com/token/0x1812d24b12a5d8117eab07958bb768fe76b29ff8"
        />
      </div>
    </q-card-section>
    <q-card-section class="tips q-mt-sm">
      {{ $t("token.description") }}
    </q-card-section>
  </q-card>
</template>
<script>
import BuyButton from "./BuyButton";

export default {
  components: { BuyButton },
  name: "TokenCard",

  data() {
    return {
      name: "Angus Token",
      address: "0x1812d24b12a5d8117eab07958bb768fe76b29ff8"
    };
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
