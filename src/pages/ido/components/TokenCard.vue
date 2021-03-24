<template>
    <q-card flat class="transparent text-white">
        <q-card-section>
            <q-avatar>
                <q-icon name="fab fa-galactic-republic" size="xl" />
            </q-avatar>
            <q-item-label class="text-h5 q-pt-md text-secondary">EtherSwap Token</q-item-label>
            <q-item-label class="text-h6 q-pt-sm" lines="1">0x1d32916cfa6534d261ad53e2498ab95505bd2510</q-item-label>
        </q-card-section>
        <q-card-section class="q-mt-sm">
            <div class="q-gutter-md">
            <q-btn rounded unelevated no-caps color="secondary" label="Connect Wallet" class="text-weight-bold" size="lg" />
            <q-btn rounded outline no-caps label="View Etherscan" size="lg" />
            </div>
        </q-card-section>
        <q-card-section class="tips q-mt-sm">
            The public round allows over-raising. After reaching the end block height, token collection and fund return will be carried out in proportion to the actual raised funds.
        </q-card-section>
    </q-card>
</template>
<script>
export default {
  name: 'TokenCard'
}
</script>
<style lang="sass" scoped>
.tips
    font-size: 14px
    font-family: PingFangSC-Regular, PingFang SC
    font-weight: 400
    color: #ffffff
    line-height: 25px
</style>