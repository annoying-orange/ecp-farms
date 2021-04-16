<template>
  <q-page class="nk-content-body">
    <div class="buysell wide-xs m-auto">
      <!-- .buysell-nav -->
      <div class="buysell-title text-center">
        <h5 class="title">What do you want to buy!</h5>
      </div>
      <!-- .buysell-title -->
      <div class="buysell-block">
        <form action="#" class="buysell-form">
          <div class="buysell-field form-group">
            <div class="form-label-group">
              <label class="form-label">Choose what you want to get</label>
            </div>
            <input
              type="hidden"
              value="btc"
              name="bs-currency"
              id="buysell-choose-currency"
            />
            <div class="dropdown buysell-cc-dropdown">
              <a
                href="#"
                class="buysell-cc-choosen dropdown-indicator"
                data-toggle="dropdown"
              >
                <div class="coin-item coin-btc">
                  <div class="coin-icon">
                    <em class="icon ni ni-sign-btc-alt"></em>
                  </div>
                  <div class="coin-info">
                    <span class="coin-name">
                      {{ buy.name }} ({{ buy.symbol }})
                    </span>
                    <span class="coin-text">{{ buy.address | address }}</span>
                  </div>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-auto dropdown-menu-mxh">
                <ul class="buysell-cc-list">
                  <li class="buysell-cc-item selected">
                    <a href="#" class="buysell-cc-opt" data-currency="btc">
                      <div class="coin-item coin-btc">
                        <div class="coin-icon">
                          <em class="icon ni ni-sign-btc-alt"></em>
                        </div>
                        <div class="coin-info">
                          <span class="coin-name">
                            {{ buy.name }} ({{ buy.symbol }})
                          </span>
                          <span class="coin-text">
                            {{ buy.address }}
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <!-- .dropdown-menu -->
            </div>
            <!-- .dropdown -->
          </div>
          <!-- .buysell-field -->
          <div class="buysell-field form-group">
            <div class="form-label-group">
              <label class="form-label" for="buysell-amount">
                Amount to Buy
              </label>
            </div>
            <div class="form-control-group">
              <input
                type="text"
                class="form-control form-control-lg form-control-number"
                id="buysell-amount"
                name="bs-amount"
                placeholder="0.000000"
                v-model="amount"
                v-on:focus="amount = null"
              />
              <div class="form-dropdown">
                <div class="text">{{ buy.symbol }}<span>/</span></div>
                <div class="dropdown">
                  <a
                    href="#"
                    class="dropdown-indicator-caret"
                    data-toggle="dropdown"
                    data-offset="0,2"
                  >
                    USDT
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-xxs dropdown-menu-right text-center"
                  >
                    <ul class="link-list-plain">
                      <li><a href="#">USDT</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-note-group">
              <span class="buysell-min form-note-alt">
                Minimum: {{ paymentToken.min }} {{ paymentToken.symbol }}
              </span>
              <span class="buysell-rate form-note-alt">
                {{ buy.exchange }} {{ buy.symbol }} =
                {{ paymentToken.exchange }}
                {{ paymentToken.symbol }}
              </span>
            </div>
          </div>
          <!-- .buysell-field -->
          <div class="buysell-field form-group">
            <div class="buysell-title text-center">
              <h5 class="title">~ {{ expectPaymentAmount }}</h5>
            </div>
          </div>

          <div class="buysell-field form-action">
            <a
              href="#"
              class="btn btn-lg btn-block btn-primary"
              data-toggle="modal"
              data-target="#confirm-coin"
              v-on:click="onBuy"
            >
              Continue to Buy
            </a>
          </div>
          <!-- .buysell-field -->
        </form>
        <!-- .buysell-form -->
      </div>
      <!-- .buysell-block -->
    </div>
    <!-- .buysell -->
    <!-- @@ Confirm Coin Modal @e -->
    <div class="modal fade" tabindex="-1" role="dialog" id="confirm-coin">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content" v-if="sending">
          <div class="modal-body modal-body-lg text-center">
            <div class="nk-modal">
              <q-spinner
                color="secondary"
                size="10em"
                :thickness="2"
                class="q-mb-lg"
              />
              <div class="nk-modal-text">
                <p class="caption-text">Sending transaction ...</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-content" v-else-if="error">
          <a href="#" class="close" data-dismiss="modal"
            ><em class="icon ni ni-cross-sm"></em
          ></a>
          <div class="modal-body modal-body-lg text-center">
            <div class="nk-modal">
              <em
                class="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-cross bg-danger"
              ></em>
              <h4 class="nk-modal-title">Insufficient balance</h4>
              <div class="nk-modal-text">
                <p class="caption-text">
                  You’ve 30 {{ paymentToken.symbol }} in wallet, but need
                  payment <strong>100</strong> {{ paymentToken.symbol }}.
                </p>
              </div>
              <div class="nk-modal-action-lg">
                <ul class="btn-group gx-4">
                  <li>
                    <a
                      href="#"
                      data-dismiss="modal"
                      class="btn btn-lg btn-mw btn-primary"
                      >Return</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-content" v-else>
          <a href="#" class="close" data-dismiss="modal"
            ><em class="icon ni ni-cross-sm"></em
          ></a>
          <div class="modal-body modal-body-lg text-center">
            <div class="nk-modal">
              <em
                class="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-check bg-success"
              ></em>
              <h4 class="nk-modal-title">Successfully sent payment!</h4>
              <div class="nk-modal-text">
                <p class="caption-text">
                  You’ve successfully bought
                  <strong>{{ amount }}</strong>
                  {{ buy.symbol }}
                  for
                  <strong>{{ expectPaymentAmount }}</strong>
                  {{ paymentToken.symbol }}.
                </p>
                <p class="sub-text-sm">
                  Learn when you reciveve bitcoin in your wallet.
                  <a href="#"> Click here</a>
                </p>
              </div>
              <div class="nk-modal-action-lg">
                <ul class="btn-group gx-4">
                  <li>
                    <a
                      href="#"
                      data-dismiss="modal"
                      class="btn btn-lg btn-mw btn-primary"
                      >Return</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- .modal-body -->
          <div class="modal-footer bg-lighter">
            <div class="text-center w-100">
              <p>
                Earn upto 10% for each friend your refer!
                <a href="#/invite" data-dismiss="modal">Invite friends</a>
              </p>
            </div>
          </div>
        </div>
        <!-- .modal-content -->
      </div>
      <!-- .modla-dialog -->
    </div>
    <!-- .modal -->
  </q-page>
</template>
<script>
export default {
  name: "Buy",

  data() {
    return {
      sending: true,
      amount: null,
      paymentToken: {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        name: "Tether USD",
        symbol: "USDT",
        decimals: 6,
        logoUri:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
        min: 100.0,
        mxn: 10000.0,
        exchange: 0.3
      },
      buy: {
        address: "0x1812d24b12a5d8117eab07958bb768fe76b29ff8",
        name: "Angus",
        symbol: "AGS",
        decimals: 18,
        logoUri: "",
        min: 100.0,
        exchange: 1.0
      },
      error: null
    };
  },

  computed: {
    expectPaymentAmount: function() {
      return this.amount * this.paymentToken.exchange;
    }
  },

  methods: {
    onBuy() {
      console.log("Continue to Buy");
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
        this.error = { message: "Insufficient balance" };
      }, 2000);
    }
  }
};
</script>
