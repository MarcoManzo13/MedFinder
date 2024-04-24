// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path"
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    MONGO_URI: process.env.MONGODB_URI
  },
  css:[
    'vuetify/lib/styles/main.sass',
    "@mdi/font/css/materialdesignicons.css"
  ],
  alias: {
    "@": resolve(__dirname, "/")
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
    '@vee-validate/nuxt',
    'nuxt-icon',
    'nuxt-vuefire',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
  },
})
