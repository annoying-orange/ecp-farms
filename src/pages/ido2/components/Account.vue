<template>
  <div class="nk-sidebar-widget d-none d-xl-block">
    <div class="user-account-info between-center">
      <div class="user-account-main">
        <h6 class="overline-title-alt">Available Balance</h6>
        <div class="user-balance">
          2.014095 <small class="currency currency-btc">BTC</small>
        </div>
        <div class="user-balance-alt">
          18,934.84 <span class="currency currency-btc">BTC</span>
        </div>
      </div>
      <a href="#" class="btn btn-white btn-icon btn-light"
        ><em class="icon ni ni-line-chart"></em
      ></a>
    </div>
    <ul class="user-account-data gy-1">
      <li>
        <div class="user-account-label">
          <span class="sub-text">Profits (7d)</span>
        </div>
        <div class="user-account-value">
          <span class="lead-text"
            >+ 0.0526 <span class="currency currency-btc">BTC</span></span
          >
          <span class="text-success ml-2"
            >3.1% <em class="icon ni ni-arrow-long-up"></em
          ></span>
        </div>
      </li>
      <li>
        <div class="user-account-label">
          <span class="sub-text">Deposit in orders</span>
        </div>
        <div class="user-account-value">
          <span class="sub-text"
            >0.005400 <span class="currency currency-btc">BTC</span></span
          >
        </div>
      </li>
    </ul>
    <div class="user-account-actions">
      <ul class="g-3">
        <li>
          <a href="#" class="btn btn-lg btn-primary"><span>Deposit</span></a>
        </li>
        <li>
          <a href="#" class="btn btn-lg btn-warning"><span>Withdraw</span></a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Account"
};
</script>
