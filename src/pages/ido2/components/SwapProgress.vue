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
              1 AGS = {{ value.rate }} USDT
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
                  {{ value.transactionCount | number }}
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
                <q-chart
                  identifier="transaction-chart"
                  stilo="height:51px; width: 100%"
                  type="bar"
                  :labels="transactionChart.labels"
                  :datasets="transactionChart.datasets"
                  :options="transactionChart.options"
                />
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
import QChart from "quasar-components-chart";

export default {
  components: { QChart },
  name: "SwapProgress",

  data() {
    return {
      transactionChart: {
        labels: [
          "22:00",
          "23:00",
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00"
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
  }
};
</script>
