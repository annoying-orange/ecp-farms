<template>
    <q-card flat class="shadow-8 radius-30">
        <q-card-section>
        <div class="text-h5 text-weight-bold">ECP Stats</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
        <q-list>
            <q-item dense>
            <q-item-section>
                <q-item-label caption class="text-weight-bold">Market Cap</q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-item-label class="text-secondary text-weight-bold">$43,267,742</q-item-label>
            </q-item-section>
            </q-item>
            <q-item dense>
            <q-item-section>
                <q-item-label caption class="text-weight-bold">Total Minted</q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-item-label class="text-secondary text-weight-bold">1,355,115</q-item-label>
            </q-item-section>
            </q-item>
            <q-item dense>
            <q-item-section>
                <q-item-label caption class="text-weight-bold">Total Burned</q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-item-label class="text-secondary text-weight-bold">229,747</q-item-label>
            </q-item-section>
            </q-item>
            <q-item dense>
            <q-item-section>
                <q-item-label caption class="text-weight-bold">Circulating Supply</q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-item-label class="text-secondary text-weight-bold">1,125,371</q-item-label>
            </q-item-section>
            </q-item>
            <q-item dense>
            <q-item-section>
                <q-item-label caption class="text-weight-bold">New ECP/block</q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-item-label class="text-secondary text-weight-bold">1</q-item-label>
            </q-item-section>
            </q-item>
        </q-list>
        </q-card-section>
    </q-card>
</template>
<script>
export default {
  name: 'Stat'
}
</script>
