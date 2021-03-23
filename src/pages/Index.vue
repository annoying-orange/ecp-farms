<template>
  <q-page class="q-pa-md">
    <q-card flat class="transparent">
      <q-card-section class="text-center">
        <q-item-label header class="q-pb-xs text-h5 text-secondary">ECP Finance</q-item-label>
        <q-item-label caption class="q-pb-md">Top 3 best DEFI app on Houbi ECO Chain</q-item-label>
      </q-card-section>
  <q-card-section class="row">
      <q-card flat class="shadow-8 radius-30 col-xs-12 col-sm-6">
           <q-card-section>
            <div class="text-h5 text-weight-bold">Farms & Staking</div>
          </q-card-section>
           <q-card-section class="q-pt-none">
             <q-item>
               <q-item-section>
                 <q-item-label class="text-h5 text-secondary text-weight-bold">~$0.00</q-item-label>
                 <q-item-label caption>ECP to Harvest</q-item-label>
               </q-item-section>
               <q-item-section>
                 <q-item-label class="text-h5 text-secondary text-weight-bold">~$0.00</q-item-label>
                <q-item-label caption >ECP in Wallet</q-item-label>
               </q-item-section>
               <q-item-section side>
                 <q-icon name="lock" />
               </q-item-section>
             </q-item>
           </q-card-section>
           <q-card-actions class="q-pa-md">
             <q-btn unelevated rounded no-caps padding="sm" color="secondary" class="full-width" label="Unlock Wallet" />
           </q-card-actions>
        </q-card>
      <q-card flat class="shadow-8 radius-30 col-xs-12 col-sm-6">
           <q-card-section>
            <div class="text-h5 text-weight-bold">Announcements</div>
          </q-card-section>
           <q-card-section class="q-pt-none">
              <q-scroll-area style="height: 200px;">
             <q-list padding>
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="primary" text-color="white" icon="bluetooth" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>5 min ago</q-item-label>
                  <q-icon name="facebook" color="yellow" />
                </q-item-section>
              </q-item>

              <q-separator spaced inset="item" />

              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="primary" text-color="white" icon="bluetooth" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>7h ago</q-item-label>
                   <q-icon name="facebook" color="yellow" />
                </q-item-section>
              </q-item>
              <q-separator spaced inset="item" />

              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="primary" text-color="white" icon="bluetooth" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>7h ago</q-item-label>
                   <q-icon name="facebook" color="yellow" />
                </q-item-section>
              </q-item>
              <q-separator spaced inset="item" />

              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="primary" text-color="white" icon="bluetooth" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>7h ago</q-item-label>
                   <q-icon name="facebook" color="yellow" />
                </q-item-section>
              </q-item>
             </q-list>
              </q-scroll-area>
           </q-card-section>
        </q-card>
        <q-card flat class="shadow-8 radius-30 col-xs-12 col-sm-6">
          <q-card-section>
            <div class="text-h5 text-weight-bold">ECP Stats</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-list>
              <q-item dense class="q-pa-none">
                <q-item-section>
                  <q-item-label caption class="text-weight-bold">Market Cap</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-secondary text-weight-bold">$43,267,742</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense class="q-pa-none">
                <q-item-section>
                  <q-item-label caption class="text-weight-bold">Total Minted</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-secondary text-weight-bold">1,355,115</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense class="q-pa-none">
                <q-item-section>
                  <q-item-label caption class="text-weight-bold">Total Burned</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-secondary text-weight-bold">229,747</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense class="q-pa-none">
                <q-item-section>
                  <q-item-label caption class="text-weight-bold">Circulating Supply</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-secondary text-weight-bold">1,125,371</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense class="q-pa-none">
                <q-item-section>
                  <q-item-label caption class="text-weight-bold">New ECP/block</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-secondary text-weight-bold">1</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
       <q-card flat class="shadow-8 radius-30 col-xs-12 col-sm-6">
          <q-card-section>
            <div class="text-h5 text-weight-bold">Total Value Locked (TVL)</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-item-label class="text-h5 text-secondary text-weight-bold">$228,099,865.30</q-item-label>
            <q-item-label caption>Across all Farms and Nests and Layers</q-item-label>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
