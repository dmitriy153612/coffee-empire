// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@pinia/nuxt'],
  ssr: true,
  devtools: { enabled: true },
  app: {
    baseURL: '/',
    head: {
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
        },
        {
          name: 'description',
          content: 'student database',
        },
      ],
      title: 'Students',
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  css: ['~/assets/css/main.scss'],
  runtimeConfig: {
    jwtKey: 'jhgjkg',
  },
  routeRules: {
    '/': {
      redirect: '/account',
    },
  },
  compatibilityDate: '2024-11-01',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/css/_variables.scss" as *;
          @use "~/assets/css/_mixins.scss" as *;
          `,
        },
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Montserrat',
        weights: [400, 500, 600],
        styles: ['normal'],
        subsets: ['latin'],
        display: 'swap',
      },
    ],
  },
})
