<template>
    <q-page class="q-pa-md">
        <q-card flat class="transparent">
            <q-card-section class="text-center">
                <q-item-label header class="q-pb-xs text-h5 text-secondary">ECP Finance</q-item-label>
                <q-item-label caption class="q-pb-md">Top 3 best DEFI app on Houbi ECO Chain</q-item-label>
            </q-card-section>
            <q-card-section class="row q-pa-none">
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                <farm-staking-card />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                <announcement-card />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                <stat-card />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                <total-value-locked-card />
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import AnnouncementCard from './components/AnnouncementCard.vue'
import FarmStakingCard from './components/FarmStakingCard'
import StatCard from './components/StatCard.vue'
import TotalValueLockedCard from './components/TotalValueLockedCard.vue'

export default {
  name: 'Home',
  components: {
    FarmStakingCard,
    AnnouncementCard,
    StatCard,
    TotalValueLockedCard
  }
}
</script>
