<template>
    <q-btn flat round :icon="icon">
        <q-menu>
            <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                <q-item-section>English</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                <q-item-section>简体中文</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>
<script>
export default {
  name: 'LanguageButton',
  props: {
      icon: String
  }
}
</script>