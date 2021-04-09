<template>
  <q-layout view="hHh Lpr lff" class="ido">
    <q-header class="bg-white">
      <q-toolbar class="q-pa-md text-primary">
        <q-icon name="fab fa-galactic-republic" size="md" />
        <q-toolbar-title>
          EtherSwap
        </q-toolbar-title>
        <div class="q-gutter-md desktop-only">
          <q-btn flat no-caps :label="$t('menu.home')" to="/ido" />
          <q-btn flat no-caps :label="$t('menu.invite')" to="/ido/invite" />
          <q-btn flat no-caps :label="$t('menu.ido')" to="/ido/detail" />
          <language-button icon="fas fa-globe" />
          <wallet-connect-button />
          <account-card />
        </div>
        <div class="mobile-only">
          <language-button icon="fas fa-globe" />
          <q-btn flat round icon="fas fa-bars">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup to="/ido">
                  <q-item-section>{{ $t("menu.home") }}</q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/ido/invite">
                  <q-item-section>{{ $t("menu.invite") }}</q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/ido/detail">
                  <q-item-section>{{ $t("menu.ido") }}</q-item-section>
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
import connectors from "../plugins/WalletDialog/connectors";
import LanguageButton from "src/components/LanguageButton";
import WalletConnectButton from "src/components/WalletConnectButton.vue";
import AccountCard from "src/components/AccountCard.vue";

export default {
  name: "IDOLayout",
  components: { LanguageButton, WalletConnectButton, AccountCard },

  data() {
    return {};
  },

  mounted() {
    connectors.every(({ name, description, connector }) => {
      console.log(`Detecting ${name}`);
      if (connector.isConnected()) {
        connector.getAccounts().then(({ accounts, chainId }) => {
          console.log({ accounts, chainId });
          this.$store.commit("connector/update", {
            name,
            description,
            accounts,
            chainId
          });
        });

        return false;
      }

      return true;
    });
  }
};
</script>
