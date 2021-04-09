<template>
  <q-btn flat round :icon="icon">
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item
          clickable
          v-close-popup
          v-for="o in langOptions"
          :key="o.value"
          @click="locale = o.value"
          :active="locale === o.value"
        >
          <q-item-section>{{ o.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script>
export default {
  name: "LanguageButton",

  props: {
    icon: String
  },

  data() {
    return {
      locale: this.$i18n.locale,
      langOptions: [
        { value: "en-us", label: "English" },
        { value: "zh-hans", label: "中文简体" }
      ]
    };
  },

  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  }
};
</script>
