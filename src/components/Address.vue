<template>
  <div class="address-wrapper">
    {{ value }}
    <button
      type="button"
      v-clipboard:copy="value"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >
      Copy!
    </button>
  </div>
</template>

<script>
export default {
  name: "Address",

  props: {
    value: String
  },

  methods: {
    onCopy: function(e) {
      alert("You just copied: " + e.text);
    },
    onError: function(e) {
      alert("Failed to copy texts");
    }
  }
};
</script>
