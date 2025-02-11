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
    newsApiKey: process.env.NEWSAPI_KEY,
    public: {
      supabaseUrl: process.env.SUPABASE_URL || "",  
      supabaseKey: process.env.SUPABASE_KEY || "",  
       ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434'
    },
  },

  // Vite et configuration SCSS
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '/video': '/public/video',  // Alias pour accéder aux vidéos dans le répertoire public
      },
    },
    build: {
      rollupOptions: {
        external: ['/public/video/Video_violet.mp4'], // Externalisation du fichier vidéo
      },
    },
  },


 



  router: {
    options: {
      strict: true,
    },
  },

  experimental: {
    payloadExtraction: false,
  },
});
