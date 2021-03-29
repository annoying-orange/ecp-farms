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
                        <q-chip square>Finish</q-chip>
                        <q-chip square>Public</q-chip>
                    </div>
                </q-item-section>
            </q-item>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <q-item>
                <q-item-section>
                    <q-item-label class="text-weight-bold">Total Raise</q-item-label>
                    <q-item-label class="text-h5 text-weight-bold q-pt-sm">$ 1000000</q-item-label>
                </q-item-section>
                <q-item-section side class="text-white">
                    <q-item-label class="text-weight-bold">Min Allocation</q-item-label>
                    <q-item-label class="text-weight-bold q-pt-sm">100 USDT</q-item-label>
                </q-item-section>
            </q-item>
        </q-card-section>
        <q-card-section>
            <q-item class="q-pb-none">
                <q-item-section class="text-white text-weight-bold">Swap Progress</q-item-section>
                <q-item-section side class="text-white">1 ETHER = 0.1 USDT</q-item-section>
            </q-item>
            <q-item class="q-pt-none q-pb-none">
                <q-item-section>
                    <q-linear-progress
                        rounded
                        size="md"
                        :value="0.65"
                        color="secondary"
                    />
                </q-item-section>
            </q-item>
            <q-item class="q-pt-none">
                <q-item-section class="text-secondary">4809.23%</q-item-section>
                <q-item-section side class="text-white">2404616.23 / 50000</q-item-section>
            </q-item>
            <q-item>
                <q-item-section class="text-weight-bold q-mb-md">End Time: 2021-03-25 20:25:38</q-item-section>
            </q-item>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <div class="q-pa-md">
                <q-btn unelevated rounded no-caps color="secondary" size="lg" class="full-width" label="Check IDO Details" to="ido/detail" />
            </div>
        </q-card-section>
    </q-card>
</template>
<script>
export default {
  name: 'IdoCard'
}
</script>