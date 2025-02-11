import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  // Plugins
  plugins: [
    "~/plugins/supabase.ts",
    "~/plugins/ollama.ts", // Ajout du plugin Ollama
  ],

  // Gestion des variables d'environnement
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || "",  
      supabaseKey: process.env.SUPABASE_KEY || "",  
    },
  },

  // Configuration de Vite
  vite: {
    plugins: [tailwindcss()], // Plugin Tailwind pour Vite
  },

  // Configuration de Nitro
  nitro: {
    serveStatic: true, // Active la gestion des fichiers statiques
  },

  // Configuration du routeur
  router: {
    options: {
      strict: true,
    },
  },

  // Options expérimentales
  experimental: {
    payloadExtraction: false,
  },
});