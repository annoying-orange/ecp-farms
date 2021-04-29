<template>
  <div>
    <div class="card-head">
      <div class="card-title mb-0">
        <h5 class="title">{{ $t("token.title") }}</h5>
      </div>
    </div>
    <!-- .card-head -->
    <div class="tranx-list card card-bordered">
      <div class="tranx-item">
        <div class="tranx-col">
          <div class="tranx-info">
            <div class="tranx-data">
              <div class="tranx-label">
                {{ $t("token.name") }}
              </div>
            </div>
          </div>
        </div>
        <div class="tranx-col">
          <div class="tranx-amount">
            <div class="number">{{ value.name }} ({{ value.symbol }})</div>
          </div>
        </div>
      </div>
      <!-- .tranx-item -->
      <div class="tranx-item">
        <div class="tranx-col">
          <div class="tranx-info">
            <div class="tranx-data">
              <div class="tranx-label">
                {{ $t("token.contractAddress") }}
              </div>
            </div>
          </div>
        </div>
        <div class="tranx-col">
          <div class="tranx-amount">
            <div class="number">
              {{ value.address | address }}
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
                {{ $t("token.totalSupply") }}
              </div>
            </div>
          </div>
        </div>
        <div class="tranx-col">
          <div class="tranx-amount">
            <div class="number">
              {{ value.totalSupply | number }}
              <span class="currency currency-btc">{{ value.symbol }}</span>
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
                {{ $t("token.holders") }}
              </div>
            </div>
          </div>
        </div>
        <div class="tranx-col">
          <div class="tranx-amount">
            <div class="number">
              {{ value.holders }}
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
                {{ $t("token.transfers") }}
              </div>
            </div>
          </div>
        </div>
        <div class="tranx-col">
          <div class="tranx-amount">
            <div class="number">
              {{ value.transfers }}
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
  name: "TokenCard",

  props: {
    value: Object
  }
};
</script>
