<!-- components/FeatureCard.vue -->
<template>
  <div 
    class="feature-card group relative overflow-hidden rounded-xl bg-[#070B11] transition-all duration-500 cursor-pointer h-[500px]"
  >
    <!-- Background Gradient Animation -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-600/0 to-purple-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
    
    <!-- Border Gradient Animation -->
    <div class="absolute inset-0 p-[1px] rounded-xl bg-gradient-to-br from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/20 transition-all duration-700">
      <div class="h-full w-full bg-[#070B11] rounded-xl">
        <!-- Content Container -->
        <div class="relative p-6 h-full flex flex-col items-center justify-between">
          <!-- Media Container -->
          <div class="flex-grow w-full h-[300px] relative overflow-hidden rounded-lg">
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#070B11] via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-10"></div>
            
            <!-- Media Element -->
            <img 
              v-if="mediaType === 'gif'"
              :src="mediaUrl"
              alt="Feature GIF"
              :class="[
                'w-full h-full object-cover transition-all duration-700',
                'transform group-hover:scale-110',
                'filter group-hover:brightness-110',
                customClass
              ]"
            />
            
            <!-- Shine Effect -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div class="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </div>
          </div>

          <!-- Text Content -->
          <div class="text-center space-y-4 w-full relative z-20">
            <h3 
              class="text-2xl font-medium text-white transform transition-all duration-500 group-hover:text-purple-400 group-hover:translate-y-[-5px]"
            >
              {{ title }}
            </h3>
            <p 
              class="text-zinc-400 text-base transition-all duration-500 transform group-hover:text-zinc-300"
            >
              {{ description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'gif';
  customClass?: string;
}

defineProps<Props>();
</script>

<style scoped>
.feature-card {
  transform: perspective(1000px) rotateX(0) rotateY(0);
  transition: transform 0.5s ease;
}

.feature-card:hover {
  transform: perspective(1000px) rotateX(2deg) rotateY(2deg);
  box-shadow: 0 25px 50px -12px rgba(139, 92, 246, 0.15);
}
</style>