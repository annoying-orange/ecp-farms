<template>
  <div class="count">
    <div>{{ value }}</div>
    <q-item-label caption class="q-mt-sm text-white">{{ label }}</q-item-label>
  </div>
</template>
<script>
export default {
  name: "Count",

  props: {
    value: String,
    label: String
  }
};
</script>
