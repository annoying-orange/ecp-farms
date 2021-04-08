<template>
  <q-page>
    <div class="bg-primary q-pt-xl q-pb-xl">
      <div class="row" style="max-width: 1200px; margin: 0 auto">
        <div class="col-xs-12 col-sm-6">
          <token-card />
        </div>
        <div class="col-xs-12 col-sm-6 q-pa-md">
          <swap-progress />
        </div>
      </div>
    </div>
    <div class="content-container">
      <div>
        <q-tabs inline-label no-caps v-model="tab" align="left">
          <q-tab name="pools" label="Pools" />
          <q-tab name="participate" label="My Participate" />
        </q-tabs>
        <q-tab-panels v-model="tab" class="q-pt-md transparent">
          <q-tab-panel name="pools" class="row q-pa-none">
            <div class="col-xs-12 col-sm-6 q-pa-md">
              <pool-information />
            </div>
            <div class="col-xs-12 col-sm-6 q-pa-md">
              <token-information />
            </div>
          </q-tab-panel>
          <q-tab-panel name="participate">
            <participate-table />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>
<script>
import ParticipateTable from "./components/ParticipateTable";
import PoolInformation from "./components/PoolInformation";
import TokenCard from "./components/TokenCard";
import SwapProgress from "./components/SwapProgress";
import TokenInformation from "./components/TokenInformation";

export default {
  name: "IDODetail",
  components: {
    TokenCard,
    SwapProgress,
    ParticipateTable,
    PoolInformation,
    TokenInformation
  },
  data() {
    return {
      tab: "pools"
    };
  }
};
</script>
