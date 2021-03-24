<template>
  <q-page class="q-pa-md">
    <q-card-section class="text-center">
      <q-btn-toggle
        no-caps
        rounded
        unelevated
        toggle-color="secondary"
        color="white"
        text-color="primary"
        v-model="value"
        :options="[
          {label: 'Exchange', value: 'swap'},
          {label: 'Liquidity', value: 'pool'}
        ]"
        class="center"
      />
    </q-card-section>
    <q-card-section class="q-pa-none">
    <q-card flat class="swap center">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h5 text-secondary text-weight-bold">Exchange</div>
            <q-item-label caption>Trade tokens in an instant</q-item-label>
          </div>
          <div class="col-auto">
            <q-btn flat round color="grey-7" icon="fas fa-cog" tabindex="Settings">
              <q-tooltip>
                Settings
              </q-tooltip>
            </q-btn>
            <q-btn flat round color="grey-7" icon="fas fa-history" @click="openTokenSelect()">
              <q-tooltip>
              Recent Transactions
              </q-tooltip>
            </q-btn>
          </div>
        </div>
       
      </q-card-section>
      <q-separator spaced />
        <q-card-section>
            <q-form class="q-gutter-md">
                <token-input v-bind="from" v-on:change="fromTokenChange" />
                <div class="text-center">
                    <q-icon name="fas fa-arrow-circle-down" size="sm" color="secondary" />
                </div>
                <token-input v-bind="to" />
                <q-item class="q-pa-md">
                    <q-item-section>
                        <q-item-label>Slippage tolerance</q-item-label>
                    </q-item-section>
                    <q-item-section side class="q-pa-none" >
                        <q-item-label class="text-weight-bold">0.5%</q-item-label>
                    </q-item-section>
                </q-item>
                <div>
                  <q-btn 
                    unelevated
                    rounded
                    no-caps
                    color="secondary"
                    padding="md"
                    label="Unlock Wallet" 
                    type="submit"
                    icon="lock"
                    class="full-width"
                  />
                </div>
            </q-form>
        </q-card-section>
    </q-card>
    </q-card-section>
  </q-page>
</template>

<script>
import TokenInput from './components/TokenInput'

export default {
  name: 'Swap',
  components: { TokenInput },

  data () {
    return {
      value: 'swap',
      swapPrice: false,
      from: {
        sybmol: 'WETH',
        logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
        amount: 1.00
      },
      to: {
        sybmol: 'USDT',
        logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
        amount: 459.004
      }
    }
  },

  methods: {
    fromTokenChange (token) {
      console.log(token)
      this.from = Object.assign(this.from, token)
    }
  }
}
</script>
