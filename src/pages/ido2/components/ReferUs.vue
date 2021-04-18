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
                <div class="title">394</div>
                <div class="sub-text">{{ $t("referUs.totalJoined") }}</div>
              </div>
              <div class="nk-refwg-sub">
                <div class="title">548.49</div>
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
                <ul class="link-list-plain sm">
                  <li>
                    <a href="#">7 {{ $t("referUs.days") }}</a>
                  </li>
                  <li>
                    <a href="#">15 {{ $t("referUs.days") }}</a>
                  </li>
                  <li>
                    <a href="#">30 {{ $t("referUs.days") }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="nk-refwg-ck">
            <q-chart
              identifier="refer-chart"
              stilo="height:51px; width: 100%"
              type="bar"
              :labels="referChart.labels"
              :datasets="referChart.datasets"
              :options="referChart.options"
            />
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
import InviteQrcode from "./InviteQrcode";

export default {
  name: "ReferUs",

  data() {
    return {
      referChart: {
        labels: [
          "01 Nov",
          "02 Nov",
          "03 Nov",
          "04 Nov",
          "05 Nov",
          "06 Nov",
          "07 Nov",
          "08 Nov",
          "09 Nov",
          "10 Nov",
          "11 Nov",
          "12 Nov",
          "13 Nov",
          "14 Nov",
          "15 Nov",
          "16 Nov",
          "17 Nov",
          "18 Nov",
          "19 Nov",
          "20 Nov",
          "21 Nov",
          "22 Nov",
          "23 Nov",
          "24 Nov",
          "25 Nov",
          "26 Nov",
          "27 Nov",
          "28 Nov",
          "29 Nov",
          "30 Nov"
        ],
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
            data: [
              110,
              80,
              125,
              55,
              95,
              75,
              90,
              110,
              80,
              125,
              55,
              95,
              75,
              90,
              110,
              80,
              125,
              55,
              95,
              75,
              90,
              110,
              80,
              125,
              55,
              95,
              75,
              90,
              75,
              90
            ]
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
                  ] +
                  " " +
                  _get_data.dataUnit
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
                  beginAtZero: true
                }
              }
            ],
            xAxes: [
              {
                display: false,
                ticks: {
                  reverse: "right"
                }
              }
            ]
          }
        }
      }
    };
  },

  props: {
    value: {
      link: String
    }
  },

  computed: {
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
  }
};
</script>
