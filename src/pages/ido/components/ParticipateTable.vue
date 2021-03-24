<template>
     <q-markup-table flat class="participate">
        <thead>
            <tr>
            <th class="text-left">Time</th>
            <th class="text-right">Participating Amount (USDT)</th>
            <th class="text-right">Actual Amount (USDT)</th>
            <th class="text-right">Amount (ETHER)</th>
            <th class="text-right">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td class="text-center" colspan="5">No Record</td>
            </tr>
        </tbody>
    </q-markup-table>
</template>
<script>
export default {
  name: 'ParticipateTable'
}
</script>
<style lang="scss" scoped>
.participate {
    border-radius: 30px;
}
</style>