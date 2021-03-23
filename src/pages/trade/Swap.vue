<template>
  <q-page class="q-pa-md">
    <q-card-section>
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
      />
    </q-card-section>
    <q-card-section class="row">
    <q-card flat class="swap">
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
            <q-btn flat round color="grey-7" icon="fas fa-history">
              <q-tooltip>
              Recent Transactions
              </q-tooltip>
            </q-btn>
          </div>
        </div>
       
      </q-card-section>
      <q-separator spaced inset />
        <q-card-section>
            <q-form>
                <q-input
                    rounded standout
                    stack-label
                    label="From"
                    placeholder="0.0"
                    input-class="text-h6"
                    v-model="from"
                >
                    <template v-slot:append>
                        <q-chip>
                            <q-avatar>
                                <img src="/tokens/eth.png">
                            </q-avatar>
                            ETH
                        </q-chip>
                    </template>
                </q-input>
                <q-card-section class="text-center">
                    <q-icon name="fas fa-arrow-circle-down" size="sm" color="secondary" />
                </q-card-section>
                <q-input
                    filled
                    stack-label
                    label="To"
                    placeholder="0.0"
                    input-class="text-h6"
                    v-model="to"
                >
                    <template v-slot:append>
                        <q-chip>
                            <q-avatar>
                                <img src="/tokens/usdt.png">
                            </q-avatar>
                            USDT
                        </q-chip>
                    </template>
                </q-input>
                <q-item class="q-pt-md q-pb-md q-pl-sm q-pr-sm">
                    <q-item-section>
                        <q-item-label>Price</q-item-label>
                    </q-item-section>
                    <q-item-section side class="q-pa-none" >
                        <div>
                            <span class="q-mr-sm" v-if="!swapPrice">0.00217863 ETH per USDT</span>
                            <span class="q-mr-sm" v-else>459.004 USDT per ETH</span>
                            <q-btn round dense flat icon="swap_horiz" @click="swapPrice = !swapPrice" />
                        </div>
                    </q-item-section>
                </q-item>
                <q-btn disable no-caps color="primary" size="lg" class="full-width" label="Insufficient ETH balance" type="submit"/>
            </q-form>
        </q-card-section>
        <q-card-section>
            <q-list dense class="rounded-borders bg-grey-3 text-grey-8">
                <q-item>
                    <q-item-section>
                        <q-item-label>Minimum Received</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label>456.7 USDT</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label>Price Impact</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label class="text-green">0.01%</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label>Liquidity Provider Fee</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label>0.003 ETH</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-card-section>
    </q-card>
    </q-card-section>
  </q-page>
</template>

<script>
export default {
  name: 'Swap',
  data () {
    return {
      value: 'swap',
      swapPrice: false,
      from: 1.0,
      to: 459.004
    }
  }
}
</script>
