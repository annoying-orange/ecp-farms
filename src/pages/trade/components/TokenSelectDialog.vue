<template>
    <q-dialog ref="dialog" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">
            <q-card-section class="row">
                <div class="text-h6">Select a token</div>
                <q-space />
                <q-btn flat round dense icon="fas fa-times" v-close-popup />
            </q-card-section>
            <q-card-section>
                <q-input
                    rounded
                    outlined
                    stack-label
                    placeholder="Search name or paste address"
                >
                </q-input>
            </q-card-section>
            <q-card-section>
                 <q-list>
                    <q-item-label header>Token name</q-item-label>
                    <q-scroll-area style="height: 550px">
                    <q-item clickable v-ripple v-for="token in tokens" :key="`TOKEN-${token.address}`" :active="selectedToken === token" @click="onOKClick(token)">
                        <q-item-section avatar>
                            <q-avatar>
                                <img :src="token.logoURI" />
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label lines="1">{{ token.name }}</q-item-label>
                            <q-item-label caption lines="1">{{ token.symbol }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-avatar v-if="selectedToken === token" size="xs" color="primary" text-color="white" icon="check" />
                        </q-item-section>
                    </q-item>
                    </q-scroll-area>
                </q-list>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script>
import tokens from '../../../utils/tokens'

export default {
  data () {
    return  {
      tokens,
      selectedToken: {
        address: null,
        symbol: null,
        decimals: null
      }
    }
  },

  props: {
    // ...your custom props
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick (token) {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.selectedToken = token
      this.$emit('ok', this.selectedToken)
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>