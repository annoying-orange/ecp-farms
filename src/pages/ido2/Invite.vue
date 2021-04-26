<template>
  <q-page class="nk-content-body">
    <div class="nk-block-head">
      <div class="nk-block-between-md g-4">
        <div class="nk-block-head-content">
          <h5 class="nk-block-title fw-normal">{{ $t("invite.referUs") }}</h5>
          <div class="nk-block-des">
            <p>{{ $t("invite.description") }}</p>
          </div>
          <div class="nk-refwg-url q-mt-md">
            <div class="form-control-wrap">
              <div
                class="form-clip clipboard-init"
                data-clipboard-target="#refUrl"
                data-success="Copied"
                :data-text="$t('invite.copyLink')"
              >
                <em class="clipboard-icon icon ni ni-copy"></em>
                <span class="clipboard-text">{{ $t("invite.copyLink") }}</span>
              </div>
              <div class="form-icon">
                <em class="icon ni ni-link-alt"></em>
              </div>
              <input
                type="text"
                class="form-control copy-text"
                id="refUrl"
                :value="link"
              />
            </div>
          </div>
        </div>
        <!-- .nk-block-head-content -->
        <div class="nk-block-head-content">
          <ul class="nk-block-tools gx-3">
            <li>
              <a href="#" class="btn btn-primary" @click="onInvite">{{
                $t("invite.invite")
              }}</a>
            </li>
          </ul>
        </div>
        <!-- .nk-block-head-content -->
      </div>
      <!-- .nk-block-between -->
    </div>

    <div class="nk-block">
      <div class="row g-2">
        <div class="col-xs-6 col-3">
          <div class="card bg-light">
            <div class="nk-wgw sm">
              <div class="nk-wgw-inner">
                <div class="nk-wgw-name">
                  <h5 class="nk-wgw-title title">
                    {{ $t("invite.totalJoined") }}
                  </h5>
                </div>
                <div class="nk-wgw-balance">
                  <div class="amount">
                    {{ refer.totalJoined | number }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-6 col-3">
          <div class="card bg-light">
            <div class="nk-wgw sm">
              <div class="nk-wgw-inner">
                <div class="nk-wgw-name">
                  <h5 class="nk-wgw-title title">
                    {{ $t("invite.totalEarn") }}
                  </h5>
                </div>
                <div class="nk-wgw-balance">
                  <div class="amount">
                    {{ refer.totalEarn | number
                    }}<span class="currency text-caption">ETS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-6 col-3">
          <div class="card bg-light">
            <div class="nk-wgw sm">
              <div class="nk-wgw-inner">
                <div class="nk-wgw-name">
                  <h5 class="nk-wgw-title title">
                    {{ $t("invite.earn1") }}
                  </h5>
                </div>
                <div class="nk-wgw-balance">
                  <div class="amount">
                    {{ refer.earn1 | number
                    }}<span class="currency text-caption">ETS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-6 col-3">
          <div class="card bg-light">
            <div class="nk-wgw sm">
              <div class="nk-wgw-inner">
                <div class="nk-wgw-name">
                  <h5 class="nk-wgw-title title">
                    {{ $t("invite.earn2") }}
                  </h5>
                </div>
                <div class="nk-wgw-balance">
                  <div class="amount">
                    {{ refer.earn2 | number
                    }}<span class="currency text-caption">ETS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="nk-block" v-if="earns.length">
      <div class="card-title">
        <h5 class="title">{{ $t("invite.earn") }}</h5>
      </div>
      <q-list separator>
        <q-item v-for="(e, i) in earns" :key="`earn-${i}`" class="q-pa-md">
          <q-item-section>
            <q-item-label lines="1">{{ e.from }}</q-item-label>
            <q-item-label caption>{{ e.timeStamp | ago }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            {{ e.amount | number }} ETS
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="nk-block" v-else>
      <div class="text-center q-pa-md">
        <span class="text-caption">{{ $t("invite.earnsHint") }}</span>
      </div>
    </div>
  </q-page>
</template>
<script>
import gql from "graphql-tag";
import InviteQrcode from "./components/InviteQrcode";

export default {
  name: "Invite",

  data() {
    return {
      refer: {
        totalJoined: 0,
        totalEarn: 0,
        earn1: 0,
        earn2: 0
      },
      earns: []
    };
  },

  computed: {
    address() {
      return this.$store.state.account.address;
    },

    link() {
      return `http://etherswap.1ecp.com/?#/${this.$store.state.account.code}`;
    }
  },

  methods: {
    onInvite() {
      this.$q.dialog({
        component: InviteQrcode,
        parent: this,
        value: this.link
      });
    }
  },

  apollo: {
    referralEarn() {
      return {
        query: gql`
          query referralEarn($address: String!, $offset: Int!, $size: Int!) {
            referralEarn(address: $address, offset: $offset, size: $size) {
              total
              result {
                from
                amount
                timeStamp
              }
              earn1
              earn2
              totalJoined
              totalEarn
            }
          }
        `,
        variables() {
          return {
            address: this.address,
            offset: 0,
            size: 50
          };
        },
        update: ({ referralEarn }) => {
          const { totalJoined, totalEarn, earn1, earn2, result } = referralEarn;
          console.log({ totalJoined, totalEarn, earn1, earn2, result });
          this.refer = Object.assign(this.refer, {
            totalJoined,
            totalEarn,
            earn1,
            earn2
          });
          this.earns = result;
        }
      };
    }
  },

  filters: {
    ago: function(val) {
      var diff = Math.round(new Date().getTime() / 1000 - val);
      if (diff < 60) {
        return `${diff} secs ago`;
      } else if (diff < 60 * 60) {
        return `${Math.round(diff / 60)} mins ago`;
      } else if (diff < 60 * 60 * 24) {
        return `${Math.round(diff / (60 * 60))} hours ago`;
      } else {
        return `${Math.round(diff / (60 * 60 * 24))} days ago`;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.nk-wgw.sm {
  display: block !important;
}

.row {
  margin-left: 0;
  margin-right: 0;
}
</style>
