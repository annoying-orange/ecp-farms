<template>
  <q-page class="nk-content-body">
    <div class="nk-block-head">
      <div class="nk-block-head-sub">
        <span>{{ $t("crowdsale.welcome") }}</span>
      </div>
      <div class="nk-block-between-md g-4">
        <div class="nk-block-head-content">
          <h2 class="nk-block-title fw-normal">{{ $t("crowdsale.title") }}</h2>
          <div class="nk-block-des">
            <p>{{ $t("crowdsale.description") }}</p>
          </div>
        </div>
        <!-- .nk-block-head-content -->
        <div class="nk-block-head-content">
          <ul class="nk-block-tools gx-3">
            <li>
              <a href="#/buy" class="btn btn-primary">
                <span>{{ $t("token.buy") }}</span>
                <em class="icon ni ni-arrow-long-right"></em>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="btn btn-white btn-light">
                <span>{{ $t("token.whitePaper") }}</span>
                <em class="icon ni ni-external"></em>
              </a>
            </li>
          </ul>
        </div>
        <!-- .nk-block-head-content -->
      </div>
      <!-- .nk-block-between -->
    </div>
    <!-- .nk-block-head -->
    <div class="nk-block">
      <div class="row gy-gs">
        <div class="col-lg-5 col-xl-4">
          <overview-card v-model="raise" />
          <!-- .nk-block -->
        </div>
        <!-- .col -->
        <div class="col-lg-7 col-xl-8">
          <swap-progress v-model="raise" />
        </div>
        <!-- .col -->
      </div>
      <!-- .row -->
    </div>
    <!-- .nk-block -->
    <div class="nk-block nk-block-lg">
      <div class="row gy-gs">
        <pool-card class="col-md-6" v-model="pool" />
        <token-card class="col-md-6" v-model="token" />
      </div>
      <!-- .row -->
    </div>
    <!-- .nk-block -->
    <refer-us />
    <partnership />
    <help />
  </q-page>
</template>
<script>
import OverviewCard from "./components/OverviewCard";
import SwapProgress from "./components/SwapProgress";
import PoolCard from "./components/PoolCard";
import TokenCard from "./components/TokenCard";
import ReferUs from "./components/ReferUs";
import Partnership from "./components/Partnership";
import Help from "./components/Help";

import { CrowdsaleContract } from "../../utils/contracts";
import {
  getTransactionStartBlock,
  getTransactionEndBlock
} from "../../utils/apis";

export default {
  components: {
    OverviewCard,
    SwapProgress,
    PoolCard,
    TokenCard,
    ReferUs,
    Partnership,
    Help
  },

  data() {
    return {
      raise: {
        expires: 0,
        rate: 0.1,
        total: 0,
        amount: 0,
        min: 100,
        max: 10000,
        status: "0",
        transactionCount: 0,
        tokenSymbol: CrowdsaleContract.token.symbol
      },
      pool: {
        startBlock: 0,
        endBlock: 0,
        status: "0",
        allocatedTime: 0,
        minAllocation: 100,
        tokenSymbol: CrowdsaleContract.token.symbol,
        qualification: "no"
      },
      token: {
        name: CrowdsaleContract.token.name,
        address: CrowdsaleContract.token.address,
        symbol: CrowdsaleContract.token.symbol,
        totalSupply: 0,
        holders: 0,
        transfers: 0
      }
    };
  },

  mounted() {
    const contract = new this.$web3.eth.Contract(
      CrowdsaleContract.abi,
      CrowdsaleContract.address
    );

    this.info(contract).then(
      ({ allocatedTime, expires, rate, min, max, total, amount, status }) => {
        this.raise = Object.assign(this.raise, {
          expires,
          rate,
          min,
          max,
          total,
          amount,
          status
        });

        this.pool = Object.assign(this.pool, {
          status,
          allocatedTime,
          minAllocation: min
        });
      }
    );

    this.$web3.eth
      .getTransactionCount(CrowdsaleContract.token.address)
      .then(transactionCount => {
        console.log({
          address: CrowdsaleContract.token.address,
          transactionCount
        });
        this.raise = Object.assign(this.raise, { transactionCount });
      });

    this.poolInformation(CrowdsaleContract).then(pool => {
      console.log({ poolInformation: pool });
      this.pool = Object.assign(this.pool, pool);
    });

    this.tokenInformation(CrowdsaleContract.token).then(token => {
      console.log({ tokenInformation: token });
      this.token = Object.assign(this.token, token);
    });
  },

  methods: {
    async info(contract) {
      const fromWei = this.$web3.utils.fromWei;
      const info = await contract.methods.getInfo().call();

      console.log({ info });

      return {
        allocatedTime: 0, //parseInt(info[0]),
        expires: 0, //parseInt(info[1]),
        rate: parseFloat(fromWei(info[2])),
        min: parseFloat(fromWei(info[3])),
        max: parseFloat(fromWei(info[4])),
        total: parseFloat(fromWei(info[5])),
        amount: parseFloat(fromWei(info[6])),
        status: "0" //info[7]
      };
    },

    async poolInformation({ address, abi }) {
      const startBlock = await getTransactionStartBlock(address);
      const endBlock = await getTransactionEndBlock(address);

      return {
        startBlock,
        endBlock
      };
    },

    async tokenInformation({ address, abi }) {
      const contract = new this.$web3.eth.Contract(abi, address);
      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();
      const totalSupply = await contract.methods.totalSupply().call();
      const holders = 1;
      const transfers = 0;

      return {
        name,
        address,
        symbol,
        totalSupply: this.$web3.utils.fromWei(totalSupply),
        holders,
        transfers
      };
    }
  }
};
</script>
