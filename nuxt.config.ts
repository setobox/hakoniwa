// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content', "@vueuse/nuxt", "@unocss/nuxt", "@nuxtjs/color-mode"],
  colorMode: {
    classSuffix: '',
  }
})
