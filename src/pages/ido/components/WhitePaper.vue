<template>
  <q-card flat class="transparent text-white q-pa-md">
    <q-card-section>
      <q-item-label class="brand-name text-h4 text-secondary">
        Angus Token
      </q-item-label>
      <q-item-label class="text-h5 q-pt-md">
        {{ $t("ido.whitePaperTitle") }}
      </q-item-label>
      <q-item-label class="q-pt-md text-grey">
        {{ $t("ido.whitePaperDescription") }}
      </q-item-label>
    </q-card-section>
    <q-card-section class="q-mt-sm">
      <div class="q-gutter-md">
        <buy-button />
        <q-btn
          rounded
          outline
          no-caps
          :label="$t('ido.whitePaper')"
          size="lg"
          type="a"
          href="#/ido"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import BuyButton from "./BuyButton";

export default {
  components: { BuyButton },
  name: "WhitePaper"
};
</script>
