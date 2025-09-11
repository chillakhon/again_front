// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', href: "/favicon.ico" }],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
      ]
    },
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/variables/_media.scss" as *;'
        }
      }
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('swiper-'),
    },
  },
  css: ['~/assets/css/style.scss'],
  runtimeConfig: {
    public: {
      DEV_URI: 'http://193.233.84.235/api'
    }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-auth-utils',
    '@vueuse/nuxt'
  ],
})
