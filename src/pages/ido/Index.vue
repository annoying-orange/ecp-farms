<template>
     <q-page class="bg-primary">
        <div class="q-pt-xl q-pb-xl">
        <div class="row" style="max-width: 1200px; margin: 0 auto">
            <div class="col-xs-12 col-sm-6">
                <white-paper />
            </div>
            <div class="col-xs-12 col-sm-6 q-pa-md">
            <q-card flat class="ido-card">
                <q-card-section>
                   <q-item>
                       <q-item-section>
                           <q-item-label class="text-weight-bold">Swap Amount</q-item-label>
                           <q-item-label class="text-h5 text-weight-bold q-pt-sm">1000000 ETHER</q-item-label>
                       </q-item-section>
                       <q-item-section side class="text-white">
                           <q-item-label class="text-weight-bold">1 EH = 0.1 USDT</q-item-label>
                           <q-item-label class="text-weight-bold q-pt-sm">100000 USDT</q-item-label>
                       </q-item-section>
                   </q-item>
                </q-card-section>
                <q-card-section>
                    <q-item-label header class="text-white text-weight-bold">Estimated countdown</q-item-label>
                    <div class="text-center">
                        <div class="finish">
                            <q-icon name="fas fa-hourglass-end"/>
                            Finish
                        </div>
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-item-label header class="text-white text-weight-bold">Swap Progress</q-item-label>
                    <q-card-section>
                    <q-linear-progress
                        rounded
                        size="md"
                        :value="0.65"
                        color="secondary"
                    />
                    </q-card-section>
                    <q-item>
                        <q-item-section class="text-secondary">4809.23%</q-item-section>
                        <q-item-section side class="text-white">2404616.23 / 50000</q-item-section>
                    </q-item>
                </q-card-section>
            </q-card>
            </div>
        </div>
        </div>
        <div class="content-container">
            <q-card flat class="transparent">
                <q-card-section class="text-center">
                    <q-item-label class="text-h4 text-white text-weight-bold">Products Highlights</q-item-label>
                </q-card-section>
                <q-card-section class="row q-mt-md">
                    <div class="col-xs-12 col-sm-3 q-pa-sm">
                        <q-card flat class="ido-card">
                            <q-card-section class="text-center">
                                <q-avatar>
                                    <img src="data:image/png;base64,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" alt="" class="product-img">
                                </q-avatar>
                                <q-item-label class="text-h6 text-white text-weight-bold q-mt-sm">Stable high returns</q-item-label>
                            </q-card-section>
                            <q-card-section>
                                The mechanism of price feeding by Oracle Machine ensures the consistency of prices between on-chain and off-chain, and reduces the risk of uncertain loss of LP liquidity providers.
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-xs-12 col-sm-3 q-pa-sm">
                        <q-card flat class="ido-card">
                            <q-card-section class="text-center">
                                <q-avatar>
                                    <img src="data:image/png;base64,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" alt="" class="product-img">
                                </q-avatar>
                                <q-item-label class="text-h6 text-white text-weight-bold q-mt-sm">Multiple Chains Deployment</q-item-label>
                            </q-card-section>
                            <q-card-section>
                                Multiple public chains such as Ethereum, TRON mainnet, Binance smart chain and Huobi ecological interconnection.
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-xs-12 col-sm-3 q-pa-sm">
                        <q-card flat class="ido-card">
                            <q-card-section class="text-center">
                                <q-avatar>
                                    <img src="/img/extend.fbe0c960.png" alt="" class="product-img">
                                </q-avatar>
                                <q-item-label class="text-h6 text-white text-weight-bold q-mt-sm">Layer 2 Scalability</q-item-label>
                            </q-card-section>
                            <q-card-section>
                                Scalability with high performance is under development, which may realize instant exchange and low Gas fee.
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-xs-12 col-sm-3 q-pa-sm">
                        <q-card flat class="ido-card">
                            <q-card-section class="text-center">
                                <q-avatar>
                                    <img src="/img/kuolian.5b5e27c4.png" alt="" class="product-img">
                                </q-avatar>
                                <q-item-label class="text-h6 text-white text-weight-bold q-mt-sm">Cross-chain Aggregation Trade</q-item-label>
                            </q-card-section>
                            <q-card-section>
                                Each DEX service provider on multiple public chains integrate all kinds of DEX liquidity and pricing to provide users with optimal trading price and minimum slippage
                            </q-card-section>
                        </q-card>
                    </div>
                </q-card-section>
            </q-card>
             <q-card flat class="transparent">
                <q-card-section class="text-center">
                    <q-item-label class="text-h4 text-white text-weight-bold">Roadmap</q-item-label>
                </q-card-section>
                <q-card-section>
                    <q-timeline color="secondary" class="text-white">

      <q-timeline-entry
        title="EtherSwap V1 version was released at the creation stage"
        subtitle="February 22, 2021"
      >
        <div>
          · Main net was launched on HecoChain<br/>
          · IDO function was available for EHTER on EHTERStarter<br/>
          · Liquidity fund pool and invitation for mining were available<br/>
          · EHTER, a protocol governance token, was released
        </div>
      </q-timeline-entry>

      <q-timeline-entry></q-timeline-entry>
    </q-timeline>
                </q-card-section>
             </q-card>
             
        </div>
        <div class="page-footer content-container">
            <q-item>
                <q-item-section>
                    <div class="q-gutter-sm">
                     <q-btn flat round no-caps color="white" icon="fab fa-twitter" />
                     <q-btn flat round no-caps color="white" icon="fab fa-telegram" />
                    </div>
                </q-item-section>
                <q-item-section side class="copyright">
                    <p>© 2020 EtherSwap</p>
                </q-item-section>
            </q-item>
        </div>
    </q-page>
</template>
<script>
import WhitePaper from './components/WhitePaper'

export default {
  name: 'IDOHome',
  components: { WhitePaper }
}
</script>
<style lang="sass" scoped>
.product-img    
    width: 44px
    height: 44px
.page-footer
    background-color: rgba(255, 255, 255, 0.1)
.contact-us
    font-size: 14px
    font-family: PingFangSC-Regular, PingFang SC
    font-weight: 400
    color: #FFFFFF
    line-height: 20px
.copyright
    color: #fff
    font-weight: 500
</style>