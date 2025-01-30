<template>
  <div 
    class="group relative overflow-hidden rounded-xl bg-zinc-900 p-6 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer"
    :class="{'opacity-0 translate-y-8': !isVisible}"
    ref="cardRef"
  >
    <!-- Video Container -->
    <div class="mb-6 h-48 relative">
      <video 
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
      >
        <source :src="videoUrl" type="video/mp4" />
      </video>
      <!-- Glow Effect -->
      <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-50"></div>
    </div>
    
    <!-- Content -->
    <div class="space-y-2">
      <h3 class="text-xl font-medium text-white group-hover:text-purple-400 transition-colors">
        {{ title }}
      </h3>
      <p class="text-zinc-400 text-sm">
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
  videoUrl: string;
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