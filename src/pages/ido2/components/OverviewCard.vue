<template>
  <div class="nk-block">
    <div class="nk-block-head-xs">
      <div class="nk-block-head-content">
        <h5 class="nk-block-title title">{{ $t("crowdsale.overview") }}</h5>
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
                  {{ $t("crowdsale.totalRaise") }}
                </div>
                <div class="number-lg amount">
                  {{ value.total }} {{ value.tokenSymbol }}
                </div>
              </q-item-section>
              <q-item-section side top>
                <q-item-label class="nk-wg7-title">
                  {{ $t("crowdsale.minAllocation") }}
                </q-item-label>
                <q-item-label class="number amount text-light">
                  {{ value.min }} {{ value.tokenSymbol }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="nk-wg7-stats q-pa-md" v-if="value.status === '1'">
              <q-item-section>
                <q-item-label class="nk-wg7-title q-pt-md q-pb-md">
                  {{ $t("crowdsale.estimatedCountdown") }}
                </q-item-label>
                <countdown :end="value.expires" />
              </q-item-section>
            </q-item>
            <q-item class="nk-wg7-stats q-pa-md text-center" v-else>
              <q-item-section>
                <q-item-label class="status">
                  {{ $t(allStatus[value.status]) }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <div class="nk-wg7-foot">
              <span class="nk-wg7-note">
                {{ $t("crowdsale.endTime") }}:
                <span v-if="value.expires === 0">--</span>
                <span v-else>{{ value.expires | datetime }}</span>
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

const allStatus = {
  "0": "status.inactive",
  "1": "status.active",
  "2": "status.pause",
  "3": "status.close"
};

export default {
  components: { Countdown },
  name: "OverviewCard",

  data() {
    return {
      allStatus
    };
  },

  props: {
    value: Object
  }
};
</script>
<style lang="scss" scoped>
.nk-wg7-foot {
  padding-top: 5px;
}

.status {
  padding: 16px;
  font-size: 2.5rem;
  line-height: 103px !important;
}
</style>
