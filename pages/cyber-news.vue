// pages/cyber-news.vue
<template>
  <section class="min-h-screen bg-black py-10 relative flex items-center justify-center pt-20">
    <ParticlesBackground />
    
    <div class="container mx-auto px-6 relative z-10 w-[95%]">
      <h1 class="text-4xl font-bold text-white mb-8 text-center">Actualités Cybersécurité</h1>
      
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      </div>
      
      <div v-else-if="error" class="bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded">
        {{ error }}
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewsCard 
          v-for="article in articles" 
          :key="article.url" 
          :article="article"
          class="feature-card"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticlesBackground from '~/components/ParticlesBackground.vue';

gsap.registerPlugin(ScrollTrigger);

const { articles, loading, error, fetchCyberNews } = useNewsApi();

onMounted(() => {
  fetchCyberNews();
  
  const cards = document.querySelectorAll('.feature-card');
  
  cards.forEach((card, index) => {
    gsap.from(card, {
      y: 100,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.2,
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        end: 'top center',
        toggleActions: 'play none none reverse'
      }
    });
  });
});
</script>

<style scoped>
.feature-card {
  transform: translateY(0);
  opacity: 1;
}
</style>