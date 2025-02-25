import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$axios = axios.create({
    baseURL: "https://api.feztool.com",
    headers: {
      common: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  });
});
