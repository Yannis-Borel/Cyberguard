import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  // Plugins
  plugins: ['~/plugins/supabase.ts'],
  

  // Gestion des variables d'environnement
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL || '',
      SUPABASE_KEY: process.env.SUPABASE_KEY || '',
    },
  },

  // Vite et configuration SCSS
  vite: {
    plugins: [
      tailwindcss(),
    ],
    css: {
      preprocessorOptions: {
      
      },
    },
  },
});
