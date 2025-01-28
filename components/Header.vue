<template>
    <header class="fixed w-full top-0 z-50 bg-black/20 backdrop-blur-sm">
      <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center">
          <img src="" alt="Logo" class="h-8" />
          <span class="text-white text-2xl ml-2">blendr</span>
        </NuxtLink>
        
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            class="text-white hover:text-blue-400 transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
  
        <div class="flex items-center space-x-4">
          <NuxtLink 
            to="/stake"
            class="hidden md:block text-white/80 hover:text-white transition-colors"
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
      </nav>
    </header>
  </template>
  
  <script setup lang="ts">
  const menuItems = [
    { label: 'Contact', path: '/contact' },
    { label: 'X / Twitter', path: 'https://twitter.com' },
    { label: 'Whitepaper', path: '/whitepaper' },
    { label: 'Documentation', path: '/documentation' },
  ]
  </script>