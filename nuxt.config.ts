import * as dotenv from "dotenv";
dotenv.config({
  path: `./.env`,
  override: false,
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@invictus.codes/nuxt-vuetify",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
  ],

  components: ["~/components"],

  plugins: ["~/plugins/axios"],

  css: ["@/assets/style/main.scss", "@/assets/style/util.scss"],

  tailwindcss: {
    configPath: "tailwind.config",
    exposeConfig: true,
    exposeLevel: 2,
    config: {},
    injectPosition: "first",
    viewer: true,
  },

  colorMode: {
    classSuffix: "",
  },

  vuetify: {
    vuetifyOptions: {
      theme: {
        themes: {
          light: {
            colors: {},
          },
          dark: {
            colors: {},
          },
          variables: {},
        },
      },
    },
    moduleOptions: {
      /* vuetify options */

      /* nuxt-vuetify module options */
      treeshaking: true,
      useIconCDN: true,

      /* vite-plugin-vuetify options */
      styles: "sass",
      autoImport: true,
    },
  },

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "",
    },
  },
});
