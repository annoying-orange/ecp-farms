<template>
  <q-layout view="hHh Lpr lff" class="ido">
    <q-header class="bg-white">
      <q-toolbar class="text-primary">
        <q-icon
          name="fab fa-galactic-republic"
          size="md"
          class="desktop-only"
        />
        <q-btn
          flat
          dense
          round
          icon="fas fa-bars"
          aria-label="Menu"
          class="mobile-only"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          EtherSwap
        </q-toolbar-title>
        <div class="q-gutter-md desktop-only">
          <q-btn flat no-caps :label="$t('menu.home')" to="/ido" />
          <q-btn flat no-caps :label="$t('menu.invite')" @click="onInvite" />
          <q-btn flat no-caps :label="$t('menu.ido')" to="/ido/detail" />
          <language-button icon="fas fa-globe" />
          <wallet-connect-button />
          <account-card />
        </div>
        <div class="mobile-only">
          <wallet-connect-button />
          <account-card />
        </div>
      </q-toolbar>
      <div class="bg" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
      class="menu"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator />
        <q-item
          clickable
          class="text-primary"
          @click="
            {
              leftDrawerOpen = false;
              localeDialog = !localeDialog;
            }
          "
        >
          <q-item-section avatar>
            <q-icon name="fas fa-globe" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ languages[locale] }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable class="text-primary" v-if="false">
          <q-item-section>
            <q-icon name="far fa-sun" /> / <q-icon name="fas fa-moon" />
          </q-item-section>
          <q-item-section> </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-dialog v-model="localeDialog" position="bottom">
      <q-card class="q-pb-md">
        <q-list separator>
          <q-item
            clickable
            class="text-center"
            v-for="lang in langOptions"
            :key="lang.value"
            :active="locale === lang.value"
            @click="changeLanguage(lang)"
          >
            <q-item-section>
              {{ lang.label }}
            </q-item-section>
          </q-item>
        </q-list>
        <q-card-section />
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import connectors from "../plugins/WalletDialog/connectors";
import LanguageButton from "src/components/LanguageButton";
import WalletConnectButton from "src/components/WalletConnectButton";
import AccountCard from "src/components/AccountCard";
import InviteDialog from "../pages/ido/components/InviteDialog";

const viewMode = {
  light: "light_mode",
  dark: "dark_mode"
};

export default {
  name: "IDOLayout",
  components: {
    EssentialLink,
    LanguageButton,
    WalletConnectButton,
    AccountCard
  },

  data() {
    return {
      darkMode: false,
      localeDialog: false,
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: this.$t("menu.home"),
          icon: "fas fa-home",
          link: "#/"
        },
        {
          title: this.$t("menu.invite"),
          icon: "fas fa-share",
          link: "#/ido/invite"
        },
        {
          title: this.$t("menu.ido"),
          icon: "fas fa-file-contract",
          link: "#/ido/detail"
        }
      ],
      locale: this.$i18n.locale,
      langOptions: [
        { value: "en-us", label: "English" },
        { value: "zh-hans", label: "中文简体" }
      ],
      languages: {
        "en-us": "English",
        "zh-hans": "中文简体"
      }
    };
  },

  mounted() {
    // connectors.every(({ name, description, connector }) => {
    //   console.log(`Detecting ${name}`);
    //   if (connector.isConnected()) {
    //     connector.getAccounts().then(({ accounts, chainId }) => {
    //       console.log({ accounts, chainId });
    //       this.$store.commit("connector/update", {
    //         name,
    //         description,
    //         accounts,
    //         chainId
    //       });
    //     });
    //     return false;
    //   }
    //   return true;
    // });
  },

  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  },

  methods: {
    onInvite() {
      const value = "https://chiax.io/#Y9mT1c8K";
      this.$q.dialog({ component: InviteDialog, parent: this, value });
    },

    changeLanguage(lang) {
      this.locale = lang.value;
      this.localeDialog = !this.localeDialog;
    }
  }
};
</script>
