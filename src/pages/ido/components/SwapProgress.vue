<template>
  <q-card flat class="ido-card">
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label class="text-weight-bold">{{
            $t("ido.swapAmount")
          }}</q-item-label>
          <q-item-label class="text-h5 text-weight-bold q-pt-sm">
            {{ issuances | fromWei }} CAV
          </q-item-label>
        </q-item-section>
        <q-item-section side class="text-white">
          <q-item-label class="text-weight-bold">
            1 CAV = {{ exchange }} USDT
          </q-item-label>
          <q-item-label class="text-weight-bold q-pt-sm">
            {{ exchangeAmount }} USDT
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section>
      <q-item-label header class="text-white text-weight-bold">
        {{ $t("ido.estimatedCountdown") }}
      </q-item-label>
      <countdown :end="expires" />
    </q-card-section>
    <q-card-section>
      <q-item-label header class="text-white text-weight-bold">
        {{ $t("ido.swapProgress") }}
      </q-item-label>
      <q-card-section>
        <q-linear-progress
          rounded
          size="md"
          :value="progress"
          color="secondary"
        />
      </q-card-section>
      <q-item>
        <q-item-section class="text-secondary">{{ progress }}%</q-item-section>
        <q-item-section side class="text-white">
          {{ purchased | fromWei }} / {{ issuances | fromWei }}
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>
<script>
import Countdown from "./Countdown";

export default {
  components: { Countdown },
  name: "SwapProgress",

  data() {
    return {
      expires: 1619827199, // IDO 到期UTC Timetamp
      exchange: 0.1, // 汇率
      purchased: "2500000000000000000000", // 已购额度 Wei
      issuances: "50000000000000000000000", // 发行额度 Wei
      min: "100000000000000000000", // 最小购买额度 Wei
      max: "100000000000000000000" // 最大购买额度 Wei
    };
  },

  computed: {
    progress() {
      return this.purchased / this.issuances;
    },

    exchangeAmount() {
      return this.$web3.utils.fromWei(this.issuances) * this.exchange;
    }
  }
};
</script>
