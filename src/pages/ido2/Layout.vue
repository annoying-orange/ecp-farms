<template>
  <q-layout view="lHh Lpr lff" class="nk-app-root">
    <q-page-container class="nk-main">
      <!-- sidebar @s -->
      <div
        class="nk-sidebar nk-sidebar-fixed"
        :class="{ 'nk-sidebar-active': leftDrawerOpen }"
      >
        <div class="nk-sidebar-element nk-sidebar-head">
          <div class="nk-sidebar-brand">
            <h4>EtherSwap</h4>
          </div>
          <div class="nk-menu-trigger mr-n2">
            <a
              href="javascript:;"
              class="nk-nav-toggle nk-quick-nav-icon d-xl-none"
              @click="leftDrawerOpen = !leftDrawerOpen"
            >
              <em class="icon ni ni-arrow-left"></em>
            </a>
          </div>
        </div>
        <!-- .nk-sidebar-element -->
        <div class="nk-sidebar-element">
          <div class="nk-sidebar-body" data-simplebar>
            <div class="nk-sidebar-content">
              <account />
              <div class="nk-sidebar-menu">
                <!-- Menu -->
                <ul class="nk-menu">
                  <li class="nk-menu-heading">
                    <h6 class="overline-title">{{ $t("menu.title") }}</h6>
                  </li>
                  <li
                    class="nk-menu-itemn"
                    :class="{
                      active: path === '/',
                      'current-page': path === '/'
                    }"
                  >
                    <a href="#/" class="nk-menu-link">
                      <span class="nk-menu-icon"
                        ><em class="icon ni ni-home"></em
                      ></span>
                      <span class="nk-menu-text">{{ $t("menu.home") }}</span>
                    </a>
                  </li>
                  <li
                    class="nk-menu-item"
                    :class="{
                      active: path === '/buy',
                      'current-page': path === '/buy'
                    }"
                  >
                    <a href="#/buy" class="nk-menu-link">
                      <span class="nk-menu-icon"
                        ><em class="icon ni ni-coins"></em
                      ></span>
                      <span class="nk-menu-text">{{ $t("menu.buy") }}</span>
                    </a>
                  </li>
                  <li
                    class="nk-menu-item"
                    :class="{
                      active: path === '/invite',
                      'current-page': path === '/invite'
                    }"
                  >
                    <a href="#/invite" class="nk-menu-link">
                      <span class="nk-menu-icon"
                        ><em class="icon ni ni-account-setting"></em
                      ></span>
                      <span class="nk-menu-text">{{ $t("menu.invite") }}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <!-- .nk-sidebar-menu -->

              <!-- .nk-sidebar-widget -->
              <div class="nk-sidebar-footer">
                <ul class="nk-menu nk-menu-footer">
                  <li class="nk-menu-item ml-auto">
                    <div class="dropup">
                      <a
                        href="#"
                        class="nk-menu-link dropdown-indicator has-indicator"
                        data-toggle="dropdown"
                        data-offset="0,10"
                      >
                        <span class="nk-menu-icon"
                          ><em class="icon ni ni-globe"></em
                        ></span>
                        <span class="nk-menu-text">English</span>
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-sm dropdown-menu-right"
                      >
                        <q-list class="language-list">
                          <q-item
                            clickable
                            v-close-popup
                            v-for="lang in languages"
                            :key="lang.value"
                            @click="locale = lang.value"
                            :active="locale === lang.value"
                          >
                            <q-item-section avatar>
                              <img
                                :src="`assets/flags/${lang.name}.png`"
                                alt=""
                                class="language-flag"
                              />
                            </q-item-section>
                            <q-item-section class="language-name">{{
                              lang.label
                            }}</q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </div>
                  </li>
                </ul>
                <!-- .nk-footer-menu -->
              </div>
              <!-- .nk-sidebar-footer -->
            </div>
            <!-- .nk-sidebar-content -->
          </div>
          <!-- .nk-sidebar-body -->
        </div>
        <!-- .nk-sidebar-element -->
      </div>
      <!-- sidebar @e -->
      <div
        class="nk-sidebar-overlay"
        v-if="leftDrawerOpen"
        @click="leftDrawerOpen = !leftDrawerOpen"
      ></div>
      <!-- wrap @s -->
      <div class="nk-wrap ">
        <!-- main header @s -->
        <div class="nk-header nk-header-fluid nk-header-fixed is-light">
          <div class="container-fluid">
            <div class="nk-header-wrap">
              <div class="nk-menu-trigger d-xl-none ml-n1">
                <a
                  href="javascript:;"
                  class="nk-nav-toggle nk-quick-nav-icon"
                  @click="leftDrawerOpen = !leftDrawerOpen"
                >
                  <em class="icon ni ni-menu"></em>
                </a>
              </div>
              <div class="nk-header-brand d-xl-none">
                <a href="/#/" class="logo-link">
                  <h5>EtherSwap</h5>
                </a>
              </div>
              <div class="nk-header-news d-none d-xl-block">
                <div class="nk-news-list">
                  <a class="nk-news-item" href="#/buy">
                    <div class="nk-news-icon">
                      <em class="icon ni ni-card-view"></em>
                    </div>
                    <div class="nk-news-text">
                      <p>
                        Do you know EtherSwap online of 2021?
                        <span>Buying ...</span>
                      </p>
                      <em class="icon ni ni-external"></em>
                    </div>
                  </a>
                </div>
              </div>
              <div class="nk-header-tools">
                <connect-status />
              </div>
            </div>
          </div>
        </div>
        <!-- main header @e -->
        <!-- content @s -->
        <div class="nk-content nk-content-fluid">
          <div class="container-xl wide-lg">
            <router-view />
          </div>
        </div>
        <!-- content @e -->
        <!-- footer @s -->
        <div class="nk-footer nk-footer-fluid">
          <div class="container-fluid">
            <div class="nk-footer-wrap">
              <div class="nk-footer-copyright">
                &copy; 2021 EtherSwap.
              </div>
              <div class="nk-footer-links">
                <ul class="nav nav-sm">
                  <li class="nav-item">
                    <a class="nav-link" href="#">{{ $t("footer.terms") }}</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">{{ $t("footer.privacy") }}</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">GitHub</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- footer @e -->
      </div>
      <!-- wrap @e -->
    </q-page-container>
  </q-layout>
</template>
<script>
import gql from "graphql-tag";
import Account from "./components/Account";
import ConnectStatus from "./components/ConnectStatus";

const languages = [
  { name: "english", value: "en-us", label: "English" },
  { name: "china", value: "zh-hans", label: "中文(简体)" }
];

export default {
  components: { Account, ConnectStatus },

  data() {
    return {
      leftDrawerOpen: false,
      path: "/",
      languages,
      locale: this.$i18n.locale,
      inviteCode: this.$route.params.inviteCode
    };
  },

  beforeRouteUpdate(to, from, next) {
    this.leftDrawerOpen = false;
    this.path = to.path;
    next();
  },

  mounted() {
    if (this.inviteCode) {
      this.$store.commit("account/update", { inviteCode });
    }

    this.$watch(
      "$store.state.connector.address",
      address => {
        if (address) {
          this.createAccount(address, this.inviteCode || "");
        }
      },
      { immediate: true }
    );

    // Auto connect to wallet
    this.$connector.connect();
  },

  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  },

  methods: {
    createAccount(address, inviteCode) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation CreateAccount($address: String!, $inviteCode: String!) {
              createAccount(
                input: { address: $address, inviteCode: $inviteCode }
              ) {
                id
                name
                address
                code
                referrals
              }
            }
          `,
          variables: {
            address,
            inviteCode
          },
          update: (store, { data: { createAccount } }) => {
            console.log({ createAccount });
            this.$store.commit("account/update", createAccount);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
