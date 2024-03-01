// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    modules: ['@nuxtjs/google-fonts'],
    googleFonts: {
        families: {
            Roboto: true,
            Lato: [100, 300],
            "Barlow Condensed" : [100, 200, 400, 600, 800],
            Raleway: {
                wght: [100, 400, 600, 800],
                ital: [100]
            },
        }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
