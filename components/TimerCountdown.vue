<script setup lang="ts">
import { ref } from "vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import moment from "moment-jalaali";

const targetDate = moment(process.env.END_TIME, "jYYYY/jM/jD");
const now = moment();
const diff = targetDate.diff(now);
const timeleft = ref(parseInt(moment(diff).format("x")));
</script>

<template>
  <ClientOnly>
    <VueCountdown
      :time="timeleft"
      v-slot="{ days, hours, minutes, seconds }"
      class="position-absolute z-10 wsize2 flex-w flex-c-m cd100 js-tilt"
    >
      <div class="flex-col-c-m size6 bor2 m-l-10 m-r-10 m-t-15">
        <span class="l2-txt1 p-b-9 days">{{ days }}</span>
        <span class="s2-txt4">Days</span>
      </div>

      <div class="flex-col-c-m size6 bor2 m-l-10 m-r-10 m-t-15">
        <span class="l2-txt1 p-b-9 hours">{{ hours }}</span>
        <span class="s2-txt4">Hours</span>
      </div>

      <div class="flex-col-c-m size6 bor2 m-l-10 m-r-10 m-t-15">
        <span class="l2-txt1 p-b-9 minutes">{{ minutes }}</span>
        <span class="s2-txt4">Minutes</span>
      </div>

      <div class="flex-col-c-m size6 bor2 m-l-10 m-r-10 m-t-15">
        <span class="l2-txt1 p-b-9 seconds">{{ seconds }}</span>
        <span class="s2-txt4">Seconds</span>
      </div>
    </VueCountdown>
  </ClientOnly>
</template>
