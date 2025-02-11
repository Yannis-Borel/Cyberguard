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


  nitro: {
    publicAssets: [
      {
        baseURL: '/video',
        dir: 'static/video',
      },
    ],
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
