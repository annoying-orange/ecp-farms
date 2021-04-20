<template>
  <div class="nk-block">
    <div class="card card-bordered">
      <div class="nk-refwg">
        <div class="nk-refwg-invite card-inner">
          <div class="nk-refwg-head g-3">
            <div class="nk-refwg-title">
              <h5 class="title">{{ $t("referUs.title") }}</h5>
              <div class="title-sub">
                {{ $t("referUs.description") }}
              </div>
            </div>
            <div class="nk-refwg-action">
              <a href="#" class="btn btn-primary" @click="onInvite">{{
                $t("referUs.invite")
              }}</a>
            </div>
          </div>
          <div class="nk-refwg-url">
            <div class="form-control-wrap">
              <div
                class="form-clip clipboard-init"
                data-clipboard-target="#refUrl"
                data-success="Copied"
                :data-text="$t('referUs.copyLink')"
              >
                <em class="clipboard-icon icon ni ni-copy"></em>
                <span class="clipboard-text">{{ $t("referUs.copyLink") }}</span>
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
        <!-- .nk-refwg-invite -->
        <div class="nk-refwg-stats card-inner bg-lighter">
          <div class="nk-refwg-group g-3">
            <div class="nk-refwg-name">
              <h6 class="title">
                {{ $t("referUs.myReferral") }}
                <em
                  class="icon ni ni-info"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Referral Informations"
                ></em>
              </h6>
            </div>
            <div class="nk-refwg-info g-3">
              <div class="nk-refwg-sub">
                <div class="title">{{ joined | number }}</div>
                <div class="sub-text">{{ $t("referUs.totalJoined") }}</div>
              </div>
              <div class="nk-refwg-sub">
                <div class="title">{{ earn | number }}</div>
                <div class="sub-text">{{ $t("referUs.referralEarn") }}</div>
              </div>
            </div>
            <div class="nk-refwg-more dropdown mt-n1 mr-n1">
              <a
                href="#"
                class="btn btn-icon btn-trigger"
                data-toggle="dropdown"
                ><em class="icon ni ni-more-h"></em
              ></a>
              <div class="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                <ul class="link-list-plain">
                  <li>
                    <a href="javascript:void();" @click="days = 7">
                      7 {{ $t("referUs.days") }}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void();" @click="days = 15">
                      15 {{ $t("referUs.days") }}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void();" @click="days = 30">
                      30 {{ $t("referUs.days") }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="nk-refwg-ck">
            <canvas ref="chart" style="height:51px; width: 100%"></canvas>
          </div>
        </div>
        <!-- .nk-refwg-stats -->
      </div>
      <!-- .nk-refwg -->
    </div>
    <!-- .card -->
  </div>
</template>
<script>
import gql from "graphql-tag";
import InviteQrcode from "./InviteQrcode";

const days = 30;
const now = new Date();
var labels = [];
var data = [];

for (var i = 0; i < days; i++) {
  var d = new Date();
  d.setDate(now.getDate() - i);
  labels.push(`${d.getMonth() + 1}-${d.getDate()}`);
  data.push(0);
}

export default {
  name: "ReferUs",

  data() {
    return {
      days,
      joined: 0,
      earn: 0,
      labels,
      dataUnit: "People",
      datasets: [
        {
          label: "Join",
          backgroundColor: "#6baafe",
          borderWidth: 2,
          borderColor: "transparent",
          hoverBorderColor: "transparent",
          borderSkipped: "bottom",
          barPercentage: 0.5,
          categoryPercentage: 0.7,
          data
        }
      ],
      options: {
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          rtl: "right",
          callbacks: {
            title: function title(tooltipItem, data) {
              return data.datasets[tooltipItem[0].datasetIndex].label;
            },
            label: function label(tooltipItem, data) {
              return (
                data.datasets[tooltipItem.datasetIndex]["data"][
                  tooltipItem["index"]
                ] + " "
              );
            }
          },
          backgroundColor: "#fff",
          titleFontSize: 13,
          titleFontColor: "#6783b8",
          titleMarginBottom: 6,
          bodyFontColor: "#9eaecf",
          bodyFontSize: 12,
          bodySpacing: 4,
          yPadding: 10,
          xPadding: 10,
          footerMarginTop: 0,
          displayColors: false
        },
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: false
              }
            }
          ],
          xAxes: [
            {
              display: true,
              ticks: {
                reverse: "left"
              }
            }
          ]
        }
      }
    };
  },

  mounted() {
    new Chart(this.$refs.chart, {
      type: "bar",
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: this.options
    });
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
    referral() {
      return {
        query: gql`
          query referral($address: String!, $days: Int!) {
            referral(address: $address, days: $days) {
              address
              joined
              earn
              labels
              data
            }
          }
        `,
        variables() {
          return {
            address: this.address,
            days: this.days
          };
        },
        update: ({ referral }) => {
          this.joined = referral.joined;
          this.earn = referral.earn;
          this.labels = referral.labels;
          this.datasets[0].data = referral.data;

          new Chart(this.$refs.chart, {
            type: "bar",
            data: {
              labels: this.labels,
              datasets: this.datasets
            },
            options: this.options
          });
        }
      };
    }
  }
};
</script>
