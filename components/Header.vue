<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const isMenuOpen = ref(false)
const { user } = useAuth()

const menuItems = [
  { label: 'CyberGuard AI', path: '/CyberGuardAI' },
  { label: 'Mini-Jeux', path: '/security-games' },
  { label: 'Actualités', path: '/cyber-news' },
  { label: 'Contact', path: '/contact' },
  { label: 'Documentation', path: '/documentation' },
]
</script>

<template>
  <header class="fixed w-full top-0 z-50 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-lg">
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center shrink-0">
        <img src="@/assets/image/Logo_cyberguard.svg" alt="Logo" class="h-8 sm:h-10 md:h-12" />
      </NuxtLink>

      <!-- Menu Desktop -->
      <div class="hidden lg:flex items-center space-x-12">
        <NuxtLink 
          v-for="item in menuItems.slice(0, 3)" 
          :key="item.path" 
          :to="item.path" 
          class="text-white/80 hover:text-white transition-colors duration-300 text-base font-medium tracking-wide"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- Boutons Desktop -->
      <div class="hidden lg:flex items-center space-x-6">
        <NuxtLink 
          v-if="!user"
          to="/connexion" 
          class="bg-violet-600 hover:bg-violet-500 text-white px-8 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 font-medium shadow-lg shadow-violet-500/20"
        >
          Se connecter
        </NuxtLink>
        <NuxtLink
          v-else
          to="/profil"
          class="bg-violet-600 hover:bg-violet-500 text-white px-8 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 font-medium shadow-lg shadow-violet-500/20"
        >
          Profil
        </NuxtLink>
      </div>

      <!-- Bouton Hamburger -->
      <button 
        @click="isMenuOpen = !isMenuOpen" 
        class="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Menu"
      >
        <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Menu Mobile -->
    <div 
      v-show="isMenuOpen" 
      class="lg:hidden fixed inset-0 top-[72px] bg-black/95 backdrop-blur-lg transform transition-transform duration-300"
    >
      <div class="container mx-auto px-6 py-8 flex flex-col space-y-6">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="text-white/90 hover:text-white text-lg font-medium transition-colors duration-300 py-2"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
        <div class="pt-6 border-t border-white/10">
          <NuxtLink
            :to="user ? '/profil' : '/connexion'"
            class="block bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 rounded-full transition-all duration-300 text-center font-medium shadow-lg shadow-violet-500/20"
            @click="isMenuOpen = false"
          >
            {{ user ? 'Profil' : 'Connexion' }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Assure que le menu mobile est toujours au-dessus des autres éléments */
.fixed {
  position: fixed;
  z-index: 50;
}

/* Animation pour le menu mobile */
.transform {
  transition-property: transform, opacity;
}

/* Effet de transition pour les liens */
.transition-colors {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>