import { useNuxtApp } from "#app";

export default {
  data() {
    const nuxt: any = useNuxtApp();
    return {
      // loadingImg: require("~/assets/img/placeholder/loading.jpg"),
      rule: {
        required: (v: string): boolean | string =>
          !!v || (nuxt.$t("form_validation.required") as boolean),
        requiredArray: (v: string): boolean | string =>
          v.length > 0 || nuxt.$t("form_validation.required"),
        match: (v: string): boolean | string =>
          v === nuxt.register.password1 ||
          nuxt.$t("form_validation.pass_not_match"),
        matchChange: (v: string): boolean | string =>
          v === nuxt.newPassword || nuxt.$t("form_validation.pass_not_match"),
        select: (v: string): boolean | string =>
          !!v || nuxt.$t("form_validation.select"),
        selectObj: (v: string): boolean | string =>
          Boolean(Object.keys(v || {})[0]) || nuxt.$t("form_validation.select"),
        username: (v: string): boolean | string => {
          const pattern = /^[a-zA-Z0-9._]+$/;
          return pattern.test(v) || nuxt.$t("form_validation.invalid_username");
        },
        password: (v: string): boolean | string => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&*])/;
          return pattern.test(v) || nuxt.$t("form_validation.pass_easy");
        },
        email: (v: string): boolean | string => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || nuxt.$t("form_validation.invalid_email");
        },
        phone: (v: string): boolean | string => {
          const pattern = /^\d{10}$/;
          const pattern2 = /^\d{9}$/;
          return (
            (pattern.test(v) && v[0] !== "0") ||
            (pattern2.test(v) && v[0] !== "0") ||
            nuxt.$t("form_validation.invalid_mobile")
          );
        },
        numeric: (v: string): boolean | string => {
          if (!v.trim()) return true;
          if (!isNaN(parseFloat(v))) return true;
          return nuxt.$t("form_validation.only_number");
        },
        min: (v: string): boolean | string => {
          return v.length >= 8 || nuxt.$t("form_validation.must_8_chars");
        },
        min3: (v: string): boolean | string => {
          return v.length >= 3 || nuxt.$t("form_validation.min3");
        },
        min5: (v: string): boolean | string => {
          return v.length >= 5 || nuxt.$t("form_validation.min5");
        },
        min8: (v: string): boolean | string => {
          return v.length >= 8 || nuxt.$t("form_validation.must_8_chars");
        },
        max30: (v: string): boolean | string => {
          return v.length <= 30 || nuxt.$t("form_validation.max30");
        },
        max90: (v: string): boolean | string => {
          return (v && v.length <= 90) || nuxt.$t("form_validation.max90");
        },
        Nmin20: (v: string): boolean | string => {
          return parseInt(v) >= 20 || nuxt.$t("form_validation.min20");
        },
        Nmin1: (v: string): boolean | string => {
          return parseInt(v) >= 1 || nuxt.$t("form_validation.min1");
        },
        minMax: (v: string): boolean | string => {
          return (
            parseInt(v) >= parseInt(nuxt.post.minimum) ||
            nuxt.$t("form_validation.minMax")
          );
        },
      },
      mediaRules: {
        max2m: (v: File): boolean | string => {
          return !v || v.size < 2000000 || nuxt.$t("form_validation.max2m");
        },
      },
    };
  },
  methods: {
    getTime(date: Date): string {
      const now = new Date().getTime();
      const dateWanted = date.getTime();

      var seconds = Math.floor((now - dateWanted) / 1000);

      var interval = seconds / 31536000;

      if (interval > 1) {
        return (Math.floor(interval) + " years").toString();
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return (Math.floor(interval) + " months").toString();
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return (Math.floor(interval) + " days").toString();
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return (Math.floor(interval) + " hours").toString();
      }
      interval = seconds / 60;
      if (interval > 1) {
        return (Math.floor(interval) + " minutes").toString();
      }
      return (Math.floor(seconds) + " seconds").toString();
    },
  },
};
