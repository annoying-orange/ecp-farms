<template>
  <div>
    <div class="nk-block">
      <div class="nk-block-head-xs">
        <div class="nk-block-between-md g-2">
          <div class="nk-block-head-content">
            <h5 class="nk-block-title title">
              {{ $t("crowdsale.swapProgress") }}
            </h5>
          </div>
          <div class="nk-block-head-content"></div>
        </div>
      </div>
      <!-- .nk-block-head -->
      <div class="nk-block">
        <div class="card bg-light q-pa-md">
          <q-item class="nk-wgw nk-wgw-name">
            <q-item-section></q-item-section>
            <q-item-section side class="nk-wgw-title title">
              1 {{ buyTokenSymbol }} = {{ value.rate }} {{ paymentTokenSymbol }}
            </q-item-section>
          </q-item>
          <q-item class="q-pt-none q-pb-none swap-progress">
            <q-item-section>
              <q-linear-progress
                rounded
                size="md"
                :value="progress || 0"
                color="secondary"
              />
            </q-item-section>
          </q-item>
          <q-item class="nk-wgw-balance">
            <q-item-section class="amount">{{ progress || 0 }}%</q-item-section>
            <q-item-section side class="amount">
              {{ value.amount }} / {{ value.total }}
            </q-item-section>
          </q-item>
        </div>
      </div>
      <!-- .row -->
    </div>
    <!-- .nk-block -->
    <div class="nk-block nk-block-md">
      <div class="nk-block-head-xs">
        <div class="nk-block-between-md g-2">
          <div class="nk-block-head-content">
            <h5 class="nk-block-title title">
              {{ $t("crowdsale.recentTransactions") }}
            </h5>
          </div>
          <div class="nk-block-head-content"></div>
        </div>
      </div>
      <div class="row g-2">
        <div class="col-sm-4">
          <div class="card bg-light">
            <div class="nk-wgw nk-wgw-inner">
              <div class="nk-wgw-name">
                <h5 class="nk-wgw-title title">
                  {{ $t("crowdsale.totalTransactions") }}
                </h5>
              </div>
              <div class="nk-wgw-balance">
                <div class="amount">
                  {{ transactionTotal | number }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- .col -->
        <div class="col-sm-8">
          <div class="card bg-light">
            <div class="nk-wgw nk-wgw-inner">
              <div class="nk-wgw-name">
                <h5 class="nk-wgw-title title">
                  {{ $t("crowdsale.recent24H") }}
                </h5>
              </div>
              <div>
                <canvas
                  ref="transactionChart"
                  style="height:51px; width: 100%"
                ></canvas>
              </div>
            </div>
          </div>
        </div>
        <!-- .col -->
      </div>
      <!-- .row -->
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
import { CrowdsaleContract, PaymentToken } from "../../../utils/contracts";

var hours = new Date().getHours();
var labels = [];
var data = [];

for (var i = 0; i < 24; i++) {
  labels.push(`${(hours + "").padStart(2, "0")}:00`);
  data.push(0);

  if (hours === 0) {
    hours = 24;
  }

  --hours;
}

export default {
  name: "SwapProgress",

  data() {
    return {
      buyTokenSymbol: CrowdsaleContract.token.symbol,
      paymentTokenSymbol: PaymentToken.symbol,
      transactionTotal: 0,
      transactionChart: {
        labels,
        dataUnit: "People",
        datasets: [
          {
            label: "",
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
    value: Object
  },

  computed: {
    progress() {
      return parseFloat((this.value.amount / this.value.total).toFixed(2));
    }
  },

  apollo: {
    referral() {
      return {
        query: gql`
          query crowdsale($address: String!) {
            crowdsale(address: $address) {
              recentTransactions {
                total
                labels
                data
              }
            }
          }
        `,
        variables() {
          return {
            address: ""
          };
        },
        update: ({ crowdsale: { recentTransactions } }) => {
          this.transactionTotal = recentTransactions.total;
          this.transactionChart.label = recentTransactions.labels;
          this.transactionChart.datasets[0].data = recentTransactions.data;

          new Chart(this.$refs.transactionChart, {
            type: "bar",
            data: {
              labels: this.transactionChart.labels,
              datasets: this.transactionChart.datasets
            },
            options: this.transactionChart.options
          });
        }
      };
    }
  }
};
</script>
