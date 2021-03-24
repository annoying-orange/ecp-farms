<template>
    <q-input
        filled
        stack-label
        placeholder="0.0"
        input-class="text-h6"
        :value="amount"
    >
        <template v-slot:append>
            <q-btn-dropdown flat rounded @click="selectToken">
                <template v-slot:label>
                    <div class="row items-center no-wrap">
                    <q-avatar>
                        <img :src="logoURI" />
                    </q-avatar>
                    <div class="text-center q-pl-sm">
                        {{ sybmol }}
                    </div>
                    </div>
                </template>
            </q-btn-dropdown>
        </template>
    </q-input>
</template>
<script>
import TokenSelectDialog from './TokenSelectDialog'

export default {
  name: 'TokenInput',

  props: {
    amount: Number,
    sybmol: String,
    logoURI: String,
  },

  methods: {
    selectToken () {
      this.$q.dialog({
        component: TokenSelectDialog,
        parent: this
      }).onOk(token => {
        this.$emit('change', token)
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    }
  }
}
</script>
