<template>
  <div class="text-center">
    <div class="finish" v-if="false">
      <q-icon name="fas fa-hourglass-end" />
      Finish
    </div>
    <q-item class="q-pl-none q-pr-none q-gutter-md">
      <count :label="$t('date.day')" v-model="day" />
      <count :label="$t('date.hour')" v-model="hour" />
      <div class="q-pt-md">:</div>
      <count :label="$t('date.minute')" v-model="minute" />
      <div class="q-pt-md">:</div>
      <count :label="$t('date.second')" v-model="second" />
    </q-item>
  </div>
</template>
<script>
import Count from "./Count";
export default {
  components: { Count },
  name: "Countdown",

  data() {
    return {
      mounted: true,
      timer: null,
      timeRemaining: 0
    };
  },

  props: {
    end: Number,
    onComplete: Function
  },

  mounted() {
    this.mounted = true;
    this.tick();
  },

  destroyed() {
    console.log("destroyed");
    this.mounted = false;
    clearTimeout(this.timer);
  },

  computed: {
    completed: function() {
      return this.end < new Date().getTime() / 1000;
    },
    day: function() {
      return Math.floor(this.timeRemaining / (3600 * 24))
        .toFixed(0)
        .padStart(1, "0");
    },
    hour: function() {
      return Math.floor((this.timeRemaining % (3600 * 24)) / 3600)
        .toFixed(0)
        .padStart(2, "0");
    },
    minute: function() {
      return Math.floor(((this.timeRemaining % (3600 * 24)) % 3600) / 60)
        .toFixed(0)
        .padStart(2, "0");
    },
    second: function() {
      return Math.floor(((this.timeRemaining % (3600 * 24)) % 3600) % 60)
        .toFixed(0)
        .padStart(2, "0");
    }
  },

  methods: {
    tick() {
      const { onComplete } = this;
      const countdownComplete = this.completed;
      this.timeRemaining = Math.round(this.end - new Date().getTime() / 1000);

      if (this.mounted) {
        if (this.timer) {
          clearTimeout(this.timer);
        }

        this.timer = countdownComplete ? null : setTimeout(this.tick, 1000);
      }

      if (countdownComplete) {
        if (onComplete !== undefined) {
          onComplete();
        }
      }
    }
  }
};
</script>
