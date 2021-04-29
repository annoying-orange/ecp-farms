<template>
  <div>
    <div class="card-head">
      <div class="card-title mb-0">
        <h5 class="title">{{ $t("pool.title") }}</h5>
      </div>
    </div>
    <!-- .card-head -->
    <div class="tranx-list card card-bordered">
      <div class="tranx-item">
        <div class="tranx-col">
          <div class="tranx-info">
            <div class="tranx-data">
              <div class="tranx-label">
                {{ $t("pool.startBlock") }}
              </div>
            </div>
          </div>
        </div>
        <div class="tranx-col">
          <div class="tranx-amount">
            <div class="number">
              {{ value.startBlock }}
            </div>
          </div>
        </div>
      </div>
      <!-- .tranx-item -->
      <div class="tranx-item">
        <div class="tranx-col">
          <div class="tranx-info">
            <div class="tranx-data">
              <div class="tranx-label">
                {{ $t("pool.endBlock") }}
              </div>
            </div>
          </div>
        </div>
        <div class="tranx-col">
          <div class="tranx-amount">
            <div class="number">
              {{ value.endBlock }}
            </div>
          </div>
        </div>
      </div>
      <!-- .tranx-item -->
      <div class="tranx-item">
        <div class="tranx-col">
          <div class="tranx-info">
            <div class="tranx-data">
              <div class="tranx-label">
                {{ $t("pool.allocatedTime") }}
              </div>
            </div>
          </div>
        </div>
        <div class="tranx-col">
          <div class="tranx-amount">
            <div class="number" v-if="value.status === '0'">
              {{ $t("pool.inactive") }}
            </div>
            <div class="number" v-else>
              {{ value.allocatedTime | datetime }}
            </div>
          </div>
        </div>
      </div>
      <!-- .tranx-item -->
      <div class="tranx-item">
        <div class="tranx-col">
          <div class="tranx-info">
            <div class="tranx-data">
              <div class="tranx-label">
                {{ $t("pool.minAllocation") }}
              </div>
            </div>
          </div>
        </div>
        <div class="tranx-col">
          <div class="tranx-amount">
            <div class="number">
              {{ value.minAllocation }}
              <span class="currency">{{ value.tokenSymbol }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- .tranx-item -->
      <div class="tranx-item">
        <div class="tranx-col">
          <div class="tranx-info">
            <div class="tranx-data">
              <div class="tranx-label">
                {{ $t("pool.qualification") }}
              </div>
            </div>
          </div>
        </div>
        <div class="tranx-col">
          <div class="tranx-amount">
            <div class="number">
              {{ $t(`pool.${value.qualification}`) }}
            </div>
          </div>
        </div>
      </div>
      <!-- .tranx-item -->
    </div>
    <!-- .tranx-list -->
  </div>
</template>
<script>
export default {
  name: "PoolCard",

  props: {
    value: {
      startBlock: Number,
      endBlock: Number,
      allocatedTime: Number,
      minAllocation: Number,
      qualification: String
    }
  }
};
</script>
