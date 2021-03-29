<template>
     <q-page class="bg-primary">
        <div class="q-pt-xl q-pb-xl">
        <div class="row" style="max-width: 1200px; margin: 0 auto">
            <div class="col-xs-12 col-sm-6">
                <white-paper />
            </div>
            <div class="col-xs-12 col-sm-6 q-pa-md">
                <ido-card />
            </div>
        </div>
        </div>
        <div class="content-container">
            <product-highlights />
            <roadmap />
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
import IdoCard from './components/IdoCard'
import ProductHighlights from './components/ProductHighlights'
import Roadmap from './components/Roadmap'

export default {
  name: 'IDOHome',
  components: { WhitePaper, IdoCard, ProductHighlights, Roadmap }
}
</script>
<style lang="sass" scoped>
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