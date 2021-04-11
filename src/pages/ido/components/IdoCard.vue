<template>
  <q-card flat class="ido-card">
    <q-card-section>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="fab fa-galactic-republic" size="md" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1" class="text-h6">EtherSwap</q-item-label>
        </q-item-section>
        <q-item-section side>
          <div>
            <q-chip square>{{ $t("ido.public") }}</q-chip>
          </div>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-item>
        <q-item-section>
          <q-item-label class="text-weight-bold">{{
            $t("ido.totalRaise")
          }}</q-item-label>
          <q-item-label class="text-h5 text-weight-bold q-pt-sm">
            {{ issuances | fromWei }} CAV
          </q-item-label>
        </q-item-section>
        <q-item-section side class="text-white">
          <q-item-label class="text-weight-bold">{{
            $t("ido.minAllocation")
          }}</q-item-label>
          <q-item-label class="text-weight-bold q-pt-sm">
            {{ min | fromWei }} USDT
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section>
      <q-item-label header class="text-white text-weight-bold">
        {{ $t("ido.estimatedCountdown") }}
      </q-item-label>
      <q-item>
        <q-item-section>
          <countdown :end="expires" />
        </q-item-section>
        <q-item-section side top>
          <q-btn
            unelevated
            rounded
            no-caps
            color="secondary"
            padding="sm xl"
            :label="$t('token.buy')"
            class="btn-buy"
            size="lg"
            @click="onBuy"
          />
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section>
      <q-item class="q-pb-none">
        <q-item-section class="text-white text-weight-bold">
          {{ $t("ido.swapProgress") }}
        </q-item-section>
        <q-item-section side class="text-white">
          1 CAV = {{ exchange }} USDT
        </q-item-section>
      </q-item>
      <q-item class="q-pt-none q-pb-none">
        <q-item-section>
          <q-linear-progress
            rounded
            size="md"
            :value="progress"
            color="secondary"
          />
        </q-item-section>
      </q-item>
      <q-item class="q-pt-none">
        <q-item-section class="text-secondary">{{ progress }}%</q-item-section>
        <q-item-section side class="text-white"
          >{{ purchased | fromWei }} / {{ issuances | fromWei }}</q-item-section
        >
      </q-item>
      <q-item>
        <q-item-section class="text-weight-bold q-mb-md">
          {{ $t("ido.endTime") }}: {{ expires | datetime }}
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <q-btn
          unelevated
          rounded
          no-caps
          color="secondary"
          size="lg"
          class="full-width"
          :label="$t('ido.checkIDODetails')"
          to="/ido/detail"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import Countdown from "./Countdown";
import BuyDialog from "./BuyDialog";

export default {
  components: { Countdown },
  name: "IdoCard",

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
    }
  },

  methods: {
    onBuy: function() {
      this.$q.dialog({ component: BuyDialog, parent: this }).onOk(() => {
        console.log("Buy Done.");
      });
    }
  }
};
</script>
