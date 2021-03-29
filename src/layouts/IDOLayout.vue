<template>
  <q-layout view="hHh Lpr lff" class="ido">
    <q-header class="bg-white">
      <q-toolbar class="q-pa-md text-primary">
        <q-icon name="fab fa-galactic-republic" size="md" />
        <q-toolbar-title>
          EtherSwap
        </q-toolbar-title>
        <div class="q-gutter-md desktop-only">
          <q-btn flat no-caps label="Home" to="/ido" />
          <q-btn flat no-caps label="Invite" to="/ido/invite" />
          <q-btn flat no-caps label="IDO" to="/ido/detail" />
          <language-button icon="fas fa-globe" />
          <wallet-connect-button />
        </div>
        <div class="mobile-only">
          <language-button icon="fas fa-globe" />
          <q-btn flat round icon="fas fa-bars">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup to="invite">
                  <q-item-section>Invite</q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="detail">
                  <q-item-section>IDO</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
      <div class="bg" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import LanguageButton from "src/components/LanguageButton";
import WalletConnectButton from "src/components/WalletConnectButton.vue";

export default {
  name: "IDOLayout",
  components: { LanguageButton, WalletConnectButton },

  data() {
    return {};
  }
};
</script>
