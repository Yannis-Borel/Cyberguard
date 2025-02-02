
// FeatureCard.vue
<template>
  <div 
    class="feature-card group relative overflow-hidden rounded-xl bg-zinc-900/90 hover:bg-zinc-800/90 transition-all duration-500 cursor-pointer flex flex-col items-center justify-between p-4"
  >
    <div class="flex-grow w-full h-80 mb-4 relative overflow-hidden">
      <video 
        v-if="mediaType === 'video'"
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      >
        <source :src="mediaUrl" type="video/mp4" />
      </video>
    </div>
    
    <div class="text-center space-y-4">
      <h3 class="text-2xl font-medium text-white group-hover:text-purple-400 transition-colors duration-300">
        {{ title }}
      </h3>
      <p class="text-zinc-400 text-base transition-colors duration-300">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'video' | 'spline';
}

defineProps<Props>();
</script>