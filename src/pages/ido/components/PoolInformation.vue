<template>
    <q-card flat>
        <q-card-section>
            <q-item-label class="text-h6 text-weight-bold q-pl-md">Pool Information</q-item-label>
        </q-card-section>
        <q-separator spaced />
        <q-card-section>
            <q-list>
                <q-item dense>
                <q-item-section>
                    <q-item-label caption class="text-weight-bold">StartBlock</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-item-label class="text-secondary text-weight-bold">12066995</q-item-label>
                </q-item-section>
                </q-item>
                <q-item dense>
                <q-item-section>
                    <q-item-label caption class="text-weight-bold">EndBlock</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-item-label class="text-secondary text-weight-bold">12069155</q-item-label>
                </q-item-section>
                </q-item>
                <q-item dense>
                <q-item-section>
                    <q-item-label caption class="text-weight-bold">Token Allocated Time</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-item-label class="text-secondary text-weight-bold">2021-03-19 20:26:47</q-item-label>
                </q-item-section>
                </q-item>
                <q-item dense>
                <q-item-section>
                    <q-item-label caption class="text-weight-bold">Min Allocation</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-item-label class="text-secondary text-weight-bold">100 USDT</q-item-label>
                </q-item-section>
                </q-item>
                <q-item dense>
                <q-item-section>
                    <q-item-label caption class="text-weight-bold">Qualification</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-item-label class="text-secondary text-weight-bold">No</q-item-label>
                </q-item-section>
                </q-item>
            </q-list>
        </q-card-section>
    </q-card>
</template>
<script>
export default {
  name: 'PoolInformation'
}
</script>