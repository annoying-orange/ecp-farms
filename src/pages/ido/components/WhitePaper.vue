<template>
    <q-card flat class="white-paper">
        <q-card-section>
            <q-item-label class="brand-name text-h4 text-secondary">EtherSwap Token</q-item-label>
            <q-item-label class="text-h6 q-pt-md" lines="1">The decentralized exchange that truly belongs to you</q-item-label>
        </q-card-section>
        <q-card-section class="q-mt-sm">
            <q-btn rounded unelevated no-caps color="secondary" label="White Paper" class="text-weight-bold" size="lg" />
        </q-card-section>
    </q-card>
</template>
<script>
export default {
  name: 'WhitePaper'
}
</script>
<style lang="sass" scoped>
    .white-paper
        color: white
        background: transparent
        padding-top: 60px

        .brand-name
            font-weight: 900
        .q-btn
            width: 50%
</style>
