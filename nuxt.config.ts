// https://nuxt.com/docs/api/configuration/nuxt-config
const url = import.meta.env.PROD
  ? "https://gliwickie-pykanko.pl"
  : "http://localhost:3000";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/google-fonts", "nuxt-multi-tenancy"],
  runtimeConfig: {
    public: {
      url,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  multiTenancy: {
    tenantDynamicRoute: "site",
    rootDomains: ["localhost", "gliwickie-pykanko.pl"],
    sites: ["msa"],
  },
  googleFonts: {
    families: {
      Roboto: true,
      Lato: [100, 300],
      Urbanist: [100, 200, 400, 600],
      "Barlow Condensed": [100, 200, 400, 600, 800],
      Raleway: {
        wght: [100, 400, 600, 800],
        ital: [100],
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
