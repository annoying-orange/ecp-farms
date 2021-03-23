<template>
    <q-card flat class="shadow-8 radius-30">
        <q-card-section>
            <div class="text-h5 text-weight-bold">Farms & Staking</div>
        </q-card-section>
        <q-card-section class="row">
            <div class="col-xs-12 col-sm-6 q-pa-md">
                <q-item-label class="text-h5 text-secondary text-weight-bold">~$0.00</q-item-label>
                <q-item-label caption>ECP to Harvest</q-item-label>
            </div>
            <div class="col-xs-12 col-sm-6 q-pa-md">
                <q-item-label class="text-h5 text-secondary text-weight-bold">~$0.00</q-item-label>
                <q-item-label caption >ECP in Wallet</q-item-label>
            </div>
        </q-card-section>
        <q-card-actions class="q-pa-md">
            <q-btn unelevated rounded no-caps icon="lock" padding="sm" color="secondary" class="full-width" label="Unlock Wallet" />
        </q-card-actions>
    </q-card>
</template>
<script>
export default {
  name: 'FarmStakingCard'
}
</script>
