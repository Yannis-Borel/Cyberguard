<template>
  <div 
    class="game-banner group relative overflow-hidden rounded-2xl bg-[#070B11] hover:bg-[#070B11]/90 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
    @click="$emit('click')"
  >
    <div class="relative h-[300px] md:h-[400px] w-full overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-[#070B11] via-transparent to-[#070B11] z-10"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#070B11] to-transparent z-10"></div>
      <img 
        :src="imageUrl" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        :alt="title"
      />
    </div>
    
    <div class="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-20">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center space-x-4 mb-4">
          <div class="h-1 w-12 bg-purple-500 rounded group-hover:w-20 transition-all duration-300"></div>
          <span class="text-purple-400 text-sm uppercase tracking-wider font-medium">Mini-jeu</span>
        </div>
        
        <h3 class="text-3xl md:text-4xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 mb-4">
          {{ title }}
        </h3>
        
        <p class="text-zinc-300 text-lg md:text-xl max-w-2xl transition-colors duration-300 mb-6">
          {{ description }}
        </p>
        
        <button class="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform group-hover:translate-x-2">
          <span>Commencer</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  imageUrl: string;
}>();

defineEmits<{
  (e: 'click'): void;
}>();
</script>