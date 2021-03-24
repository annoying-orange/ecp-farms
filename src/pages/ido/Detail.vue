<template>
    <q-page>
        <div class="bg-primary q-pt-xl q-pb-xl">
        <div class="row" style="max-width: 1200px; margin: 0 auto">
            <div class="col-xs-12 col-sm-6">
                <token-card />
            </div>
            <div class="col-xs-12 col-sm-6 q-pa-md">
            <q-card flat class="ido-card">
                <q-card-section>
                   <q-item>
                       <q-item-section>
                           <q-item-label class="text-weight-bold">Swap Amount</q-item-label>
                           <q-item-label class="text-h5 text-weight-bold q-pt-sm">1000000 ETHER</q-item-label>
                       </q-item-section>
                       <q-item-section side class="text-white">
                           <q-item-label class="text-weight-bold">1 EH = 0.1 USDT</q-item-label>
                           <q-item-label class="text-weight-bold q-pt-sm">100000 USDT</q-item-label>
                       </q-item-section>
                   </q-item>
                </q-card-section>
                <q-card-section>
                    <q-item-label header class="text-white text-weight-bold">Estimated countdown</q-item-label>
                    <div class="text-center">
                        <div class="finish">
                            <q-icon name="fas fa-hourglass-end"/>
                            Finish
                        </div>
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-item-label header class="text-white text-weight-bold">Swap Progress</q-item-label>
                    <q-card-section>
                    <q-linear-progress
                        rounded
                        size="md"
                        :value="0.65"
                        color="secondary"
                    />
                    </q-card-section>
                    <q-item>
                        <q-item-section class="text-secondary">4809.23%</q-item-section>
                        <q-item-section side class="text-white">2404616.23 / 50000</q-item-section>
                    </q-item>
                </q-card-section>
            </q-card>
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
import ParticipateTable from './components/ParticipateTable.vue'
import PoolInformation from './components/PoolInformation.vue'
import TokenCard from './components/TokenCard'
import TokenInformation from './components/TokenInformation.vue'

export default {
  name: 'IDODetail',
  components: { TokenCard, ParticipateTable, PoolInformation, TokenInformation },
  data () {
      return {
        tab: 'pools'
      }
  }
}
</script>
