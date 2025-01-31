<template>
  <div 
    class="group relative overflow-hidden rounded-xl bg-zinc-900 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between p-4"
    ref="cardRef"
  >
    <!-- Media Container -->
    <div class="flex-grow w-full h-80 mb-4 relative">
      <video 
        v-if="mediaType === 'video'"
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      >
        <source :src="mediaUrl" type="video/mp4" />
      </video>
    </div>
    
    <!-- Content -->
    <div class="text-center space-y-4">
      <h3 class="text-2xl font-medium text-white group-hover:text-purple-400 transition-colors">
        {{ title }}
      </h3>
      <p class="text-zinc-400 text-base">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

interface Props {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'video' | 'spline';
}

const props = defineProps<Props>();
const cardRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  if (cardRef.value) {
    const { stop } = useIntersectionObserver(
      cardRef,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          isVisible.value = true;
          stop();
        }
      },
      { threshold: 0.2 }
    );
  }
});
</script>
