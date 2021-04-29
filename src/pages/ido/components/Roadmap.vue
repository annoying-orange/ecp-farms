<template>
  <q-card flat class="transparent">
    <q-card-section class="text-center">
      <q-item-label class="text-h4 text-white text-weight-bold"
        >Roadmap</q-item-label
      >
    </q-card-section>
    <q-card-section>
      <q-timeline color="secondary" class="text-white">
        <q-timeline-entry
          title="ChiaX V1 version was released at the creation stage"
          subtitle="February 22, 2021"
        >
          <div>
            · Main net was launched on HecoChain<br />
            · IDO function was available for EHTER on EHTERStarter<br />
            · Liquidity fund pool and invitation for mining were available<br />
            · EHTER, a protocol governance token, was released
          </div>
        </q-timeline-entry>

        <q-timeline-entry></q-timeline-entry>
      </q-timeline>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: "Roadmap"
};
</script>
