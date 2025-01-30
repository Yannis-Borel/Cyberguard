<template>
  <header class="fixed w-full top-0 z-50">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <img src="@/assets/image/Logo_cyberguard.svg" alt="Logo" class="h-8 sm:h-10 md:h-12" />
      </NuxtLink>
      
      <!-- Menu Desktop -->
      <div class="hidden lg:flex items-center space-x-8">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="text-white hover:text-blue-400 transition-colors"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- Boutons Desktop -->
      <div class="hidden lg:flex items-center space-x-4">
        <NuxtLink 
          to="/stake"
          class="text-white/80 hover:text-white transition-colors"
        >
          Stake
        </NuxtLink>
        <NuxtLink 
          to="/blendr"
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors"
        >
          $BLENDR
        </NuxtLink>
      </div>

      <!-- Bouton Hamburger -->
      <button 
        @click="isMenuOpen = !isMenuOpen"
        class="lg:hidden text-white p-2"
      >
        <svg 
          v-if="!isMenuOpen"
          class="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg 
          v-else
          class="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Menu Mobile -->
    <div 
      v-if="isMenuOpen"
      class="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg"
    >
      <div class="container mx-auto px-4 py-4 flex flex-col space-y-4">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="text-white hover:text-blue-400 transition-colors py-2"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
        <div class="pt-4 border-t border-white/10 flex flex-col space-y-4">
          <NuxtLink 
            to="/stake"
            class="text-white/80 hover:text-white transition-colors"
            @click="isMenuOpen = false"
          >
            Stake
          </NuxtLink>
          <NuxtLink 
            to="/blendr"
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors text-center"
            @click="isMenuOpen = false"
          >
            $BLENDR
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const menuItems = [
{ label: 'Contact', path: '/contact' },
{ label: 'X / Twitter', path: 'https://twitter.com' },
{ label: 'Whitepaper', path: '/whitepaper' },
{ label: 'Documentation', path: '/documentation' },
]
</script>

<style scoped>
.backdrop-blur-lg {
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
}
</style>