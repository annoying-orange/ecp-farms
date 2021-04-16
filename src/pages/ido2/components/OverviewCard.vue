<template>
  <div class="nk-block">
    <div class="nk-block-head-xs">
      <div class="nk-block-head-content">
        <h5 class="nk-block-title title">Overview</h5>
      </div>
    </div>
    <!-- .nk-block-head -->
    <div class="nk-block">
      <div class="card card-bordered text-light is-dark h-100">
        <div class="card-inner">
          <div class="nk-wg7">
            <q-item class="nk-wg7-stats">
              <q-item-section>
                <div class="nk-wg7-title">
                  {{ $t("ido.totalRaise") }}
                </div>
                <div class="number-lg amount">
                  {{ issuances | fromWei }} AGS
                </div>
              </q-item-section>
              <q-item-section side top>
                <q-item-label class="nk-wg7-title">
                  {{ $t("ido.minAllocation") }}
                </q-item-label>
                <q-item-label class="number amount text-light">
                  {{ min | fromWei }} USDT
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="nk-wg7-stats q-pa-md">
              <q-item-section>
                <q-item-label class="nk-wg7-title q-pt-md q-pb-md">
                  {{ $t("ido.estimatedCountdown") }}
                </q-item-label>
                <countdown :end="expires" />
              </q-item-section>
            </q-item>
            <div class="nk-wg7-foot">
              <span class="nk-wg7-note">
                {{ $t("ido.endTime") }}: <span>{{ expires | datetime }}</span>
              </span>
            </div>
          </div>
          <!-- .nk-wg7 -->
        </div>
        <!-- .card-inner -->
      </div>
      <!-- .card -->
    </div>
    <!-- .nk-block -->
  </div>
</template>
<script>
import Countdown from "./Countdown";

export default {
  components: { Countdown },
  name: "OverviewCard",

  data() {
    return {
      expires: 1619827199, // IDO 到期UTC Timetamp
      exchange: 0.1, // 汇率
      purchased: "2500000000000000000000", // 已购额度 Wei
      issuances: "50000000000000000000000", // 发行额度 Wei
      min: "100000000000000000000", // 最小购买额度 Wei
      max: "100000000000000000000", // 最大购买额度 Wei
      ido: {
        address: "0x49fa04CFc1fbc13d5c29358ab96D852203aD5765"
      }
    };
  },

  computed: {
    progress() {
      return this.purchased / this.issuances;
    }
  }
};
</script>
<style lang="scss" scoped>
.nk-wg7-foot {
  padding-top: 5px;
}
</style>
