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
export default {
  name: "TokenCard",

  data() {
    return {
      name: "Caviar Token",
      address: "0xfe77358a99ea08dc2c2b1598bfafd42c796a59bd"
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
