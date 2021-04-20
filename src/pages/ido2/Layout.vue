<template>
  <q-layout view="lHh Lpr lff" class="nk-app-root">
    <q-page-container class="nk-main">
      <!-- sidebar @s -->
      <div class="nk-sidebar nk-sidebar-fixed " data-content="sidebarMenu">
        <div class="nk-sidebar-element nk-sidebar-head">
          <div class="nk-sidebar-brand">
            <a href="/" class="logo-link nk-sidebar-logo">
              <img
                class="logo-light logo-img"
                src="assets/logo.png"
                srcset="assets/logo2x.png 2x"
                alt="logo"
              />
              <img
                class="logo-dark logo-img"
                src="assets/logo-dark.png"
                srcset="assets/logo-dark2x.png 2x"
                alt="logo-dark"
              />
            </a>
          </div>
          <div class="nk-menu-trigger mr-n2">
            <a
              href="#"
              class="nk-nav-toggle nk-quick-nav-icon d-xl-none"
              data-target="sidebarMenu"
              ><em class="icon ni ni-arrow-left"></em
            ></a>
          </div>
        </div>
        <!-- .nk-sidebar-element -->
        <div class="nk-sidebar-element">
          <div class="nk-sidebar-body" data-simplebar>
            <div class="nk-sidebar-content">
              <account />
              <!-- .nk-sidebar-widget -->
              <div
                class="nk-sidebar-widget nk-sidebar-widget-full d-xl-none pt-0"
              >
                <a
                  class="nk-profile-toggle toggle-expand"
                  data-target="sidebarProfile"
                  href="#"
                >
                  <div class="user-card-wrap">
                    <div class="user-card">
                      <div class="user-avatar">
                        <span>AB</span>
                      </div>
                      <div class="user-info">
                        <span class="lead-text">Abu Bin Ishtiyak2</span>
                        <span class="sub-text">info@softnio.com</span>
                      </div>
                      <div class="user-action">
                        <em class="icon ni ni-chevron-down"></em>
                      </div>
                    </div>
                  </div>
                </a>
                <div
                  class="nk-profile-content toggle-expand-content"
                  data-content="sidebarProfile"
                >
                  <div class="user-account-info between-center">
                    <div class="user-account-main">
                      <h6 class="overline-title-alt">Available Balance</h6>
                      <div class="user-balance">
                        2.014095
                        <small class="currency currency-btc">BTC</small>
                      </div>
                      <div class="user-balance-alt">
                        18,934.84
                        <span class="currency currency-btc">BTC</span>
                      </div>
                    </div>
                    <a href="#" class="btn btn-icon btn-light"
                      ><em class="icon ni ni-line-chart"></em
                    ></a>
                  </div>
                  <ul class="user-account-data">
                    <li>
                      <div class="user-account-label">
                        <span class="sub-text">Profits (7d)</span>
                      </div>
                      <div class="user-account-value">
                        <span class="lead-text"
                          >+ 0.0526
                          <span class="currency currency-btc">BTC</span></span
                        >
                        <span class="text-success ml-2"
                          >3.1% <em class="icon ni ni-arrow-long-up"></em
                        ></span>
                      </div>
                    </li>
                    <li>
                      <div class="user-account-label">
                        <span class="sub-text">Deposit in orders</span>
                      </div>
                      <div class="user-account-value">
                        <span class="sub-text text-base"
                          >0.005400
                          <span class="currency currency-btc">BTC</span></span
                        >
                      </div>
                    </li>
                  </ul>
                  <ul class="user-account-links">
                    <li>
                      <a href="#" class="link"
                        ><span>Withdraw Funds</span>
                        <em class="icon ni ni-wallet-out"></em
                      ></a>
                    </li>
                    <li>
                      <a href="#" class="link"
                        ><span>Deposit Funds</span>
                        <em class="icon ni ni-wallet-in"></em
                      ></a>
                    </li>
                  </ul>
                  <ul class="link-list">
                    <li>
                      <a href="html/crypto/profile.html"
                        ><em class="icon ni ni-user-alt"></em
                        ><span>View Profile</span></a
                      >
                    </li>
                    <li>
                      <a href="html/crypto/profile-security.html"
                        ><em class="icon ni ni-setting-alt"></em
                        ><span>Account Setting</span></a
                      >
                    </li>
                    <li>
                      <a href="html/crypto/profile-activity.html"
                        ><em class="icon ni ni-activity-alt"></em
                        ><span>Login Activity</span></a
                      >
                    </li>
                  </ul>
                  <ul class="link-list">
                    <li>
                      <a href="#"
                        ><em class="icon ni ni-signout"></em
                        ><span>Sign out</span></a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <!-- .nk-sidebar-widget -->
              <div class="nk-sidebar-menu">
                <!-- Menu -->
                <ul class="nk-menu">
                  <li class="nk-menu-heading">
                    <h6 class="overline-title">{{ $t("menu.title") }}</h6>
                  </li>
                  <li class="nk-menu-item">
                    <a href="#/" class="nk-menu-link">
                      <span class="nk-menu-icon"
                        ><em class="icon ni ni-home"></em
                      ></span>
                      <span class="nk-menu-text">{{ $t("menu.home") }}</span>
                    </a>
                  </li>
                  <li class="nk-menu-item">
                    <a href="#/buy" class="nk-menu-link">
                      <span class="nk-menu-icon"
                        ><em class="icon ni ni-coins"></em
                      ></span>
                      <span class="nk-menu-text">{{ $t("menu.buy") }}</span>
                    </a>
                  </li>
                  <li class="nk-menu-item">
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
      <!-- wrap @s -->
      <div class="nk-wrap ">
        <!-- main header @s -->
        <div class="nk-header nk-header-fluid nk-header-fixed is-light">
          <div class="container-fluid">
            <div class="nk-header-wrap">
              <div class="nk-menu-trigger d-xl-none ml-n1">
                <a
                  href="#"
                  class="nk-nav-toggle nk-quick-nav-icon"
                  data-target="sidebarMenu"
                  ><em class="icon ni ni-menu"></em>
                </a>
              </div>
              <div class="nk-header-brand d-xl-none">
                <a href="/#/" class="logo-link">
                  <img
                    class="logo-light logo-img"
                    src="assets/logo.png"
                    srcset="assets/logo2x.png 2x"
                    alt="logo"
                  />
                  <img
                    class="logo-dark logo-img"
                    src="assets/logo-dark.png"
                    srcset="assets/logo-dark2x.png 2x"
                    alt="logo-dark"
                  />
                  <span class="nio-version">Crypto</span>
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
      leftDrawerOpen: true,
      languages,
      locale: this.$i18n.locale
    };
  },

  mounted() {
    this.$store.commit("account/update", {
      inviteCode: this.$route.params.inviteCode || ""
    });
  },

  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  }
};
</script>
