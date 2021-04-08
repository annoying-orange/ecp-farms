<template>
  <q-item clickable @click="onClick">
    <q-item-section avatar>
      <q-icon :name="icon" size="md" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-left">{{ name }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  name: "WalletItem",

  props: {
    name: String,
    icon: String
  },

  methods: {
    onClick() {
      this.$emit("connect");
      this.$emit("dismiss");
    }
  }
};
</script>
