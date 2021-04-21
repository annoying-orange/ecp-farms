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
              <a href="#" class="btn btn-white btn-light">
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
        expires: 1619827199,
        rate: 0.1,
        total: 0,
        amount: 0,
        min: 100,
        max: 10000,
        transactionCount: 0
      },
      pool: {
        startBlock: 0,
        endBlock: 0,
        allocatedTime: 0,
        minAllocation: 100,
        symbol: "ETH",
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

    contract.methods
      .getInfo()
      .call()
      .then(result => {
        console.log({ info: result });
        const fromWei = this.$web3.utils.fromWei;
        this.raise = Object.assign(this.raise, {
          expires: parseInt(result[1]),
          rate: parseFloat(fromWei(result[2])),
          min: parseFloat(fromWei(result[3])),
          max: parseFloat(fromWei(result[4])),
          total: parseFloat(fromWei(result[5])),
          amount: parseFloat(fromWei(result[6]))
        });

        this.pool = Object.assign(this.pool, {
          allocatedTime: parseInt(result[0]),
          minAllocation: fromWei(result[3])
        });

        this.$store.commit("account/update", {
          minAllocation: parseFloat(fromWei(result[3])),
          maxAllocation: parseFloat(fromWei(result[4]))
        });
      });

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
      const holders = 12;
      const transfers = 12;

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
