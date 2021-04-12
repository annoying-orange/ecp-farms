<template>
  <q-card flat>
    <q-card-section>
      <q-item-label class="text-h6 text-weight-bold q-pl-md"
        >Token Information</q-item-label
      >
    </q-card-section>
    <q-separator spaced />
    <q-card-section>
      <q-list>
        <q-item dense>
          <q-item-section>
            <q-item-label caption class="text-weight-bold">Name</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-secondary text-weight-bold"
              >Angus Token</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section class="col-xs-5 col-sm-3">
            <q-item-label caption class="text-weight-bold"
              >Contract Address</q-item-label
            >
          </q-item-section>
          <q-item-section class="text-right">
            <q-item-label lines="1" class="text-secondary text-weight-bold"
              >0x1812d24b12a5d8117eab07958bb768fe76b29ff8</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>
            <q-item-label caption class="text-weight-bold"
              >Total Supply</q-item-label
            >
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-secondary text-weight-bold"
              >500000</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>
            <q-item-label caption class="text-weight-bold">Holder</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-secondary text-weight-bold"
              >196</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>
            <q-item-label caption class="text-weight-bold">Trades</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-secondary text-weight-bold"
              >Trades</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: "TokenInformation"
};
</script>
