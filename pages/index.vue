<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTheme } from "vuetify";
import moment from "moment-jalaali";

import lightBg from "@/assets/images/bg06.jpg";
import darkBg from "@/assets/images/bg05.jpg";

useSeoMeta({
  title: "Feztool",
  ogTitle: "Feztool; Free and Easy",
  description: "Feztool is coming soon",
  ogDescription: "Feztool is coming soon",
});

const theme = useTheme();

const startTime = moment().startOf("day").add(6, "hours");
const endTime = moment().startOf("day").add(18, "hours");

const colorMode = useColorMode();
let darkMode = ref(theme.current.value.dark);

const reRenderFlag = ref(true);

// dev functions

const checkTimeSetDarkMode = async () => {
  if (moment().isBetween(startTime, endTime)) {
    theme.global.name.value = "light";
    setTimeout(() => {
      colorMode.preference = "light";
    }, 100);
  } else {
    theme.global.name.value = "dark";
    setTimeout(() => {
      colorMode.preference = "dark";
    }, 100);
  }
  darkMode.value = theme.current.value.dark;
};

onMounted(async () => {
  checkTimeSetDarkMode();
});

// user functions
const changeMode = () => {
  theme.global.name.value = darkMode.value ? "dark" : "light";
  colorMode.preference = darkMode.value ? "dark" : "light";

  reRenderFlag.value = false;
  setTimeout(() => {
    reRenderFlag.value = true;
  }, 10);
};
</script>

<template>
  <div class="h-screen w-100 position-relative z-1">
    <!-- Coutdown -->
    <div
      class="d-flex justify-center align-center bg-img1 size2 where1 overlay1 where2 respon2"
      :style="{
        backgroundImage: `url('${
          theme.current.value.dark ? darkBg : lightBg
        }')`,
      }"
    >
      <ClientOnly>
        <Earth v-if="reRenderFlag" />
        <TimerCountdown />
      </ClientOnly>
    </div>

    <!-- Form -->
    <div class="size3 flex-col-sb flex-w p-l-75 p-r-75 p-t-45 p-b-45 respon1">
      <div class="wrap-pic1">
        <img
          v-if="theme.current.value.dark"
          src="@/assets/images/logo/Logo_White.png"
          alt="LOGO"
          class="float-left mt-1 mr-5"
          style="max-width: 90px"
        />
        <img
          v-else
          src="@/assets/images/logo/Logo_Black.png"
          alt="LOGO"
          class="float-left mt-1 mr-5"
          style="max-width: 90px"
        />
        <v-switch
          v-model="darkMode"
          color="pink-accent-2"
          class="float-left"
          append-icon="mdi-weather-night"
          inset
          @change="changeMode"
        ></v-switch>
      </div>

      <Subscribe />

      <div class="flex-w">
        <v-btn
          color="pink-accent-2"
          icon
          href="https://instagram.com/fez.tool?igshid=MWZjMTM2ODFkZg=="
        >
          <v-icon size="25px"> mdi-instagram </v-icon>
        </v-btn>

        <v-btn
          color="indigo-darken-1"
          class="ml-2"
          icon
          href="https://www.linkedin.com/company/feztool/"
        >
          <v-icon size="25px"> mdi-linkedin </v-icon>
        </v-btn>
      </div>
    </div>

    <EarthRender />
  </div>
</template>
