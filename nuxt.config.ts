// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-mongoose', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  vite: {
    server: {
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'soumyadip.weloin.net'
      ]
    }
  },

  runtimeConfig: {
    tokenSecret: process.env.NUXT_TOKEN_SECRET,
    razorpayKeyId: process.env.NUXT_RAZORPAY_KEY_ID,
    razorpayKeySecret: process.env.NUXT_RAZORPAY_KEY_SECRET,
    razorpayWebhookSignature: process.env.NUXT_RAZORPAY_WEBHOOK_SIGNATURE,
    myWebhookSecret: process.env.NUXT_RAZORPAY_WEBHOOK_SECRET,
    public: {
      razorpayKeyId: process.env.NUXT_RAZORPAY_KEY_ID
    }
  },

  mongoose: {
    uri: "mongodb://mongo-sub:27017/test",
    options: {},
    modelsDir: "models",
    devtools: true,
  },
})

