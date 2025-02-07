<template>
  <section class="min-h-screen bg-black py-10 relative flex items-center justify-center">
    <ParticlesBackground />
    
    <div class="container mx-auto px-6 relative z-10 w-[95%]">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        <AccueilCardFeatureCard
          v-for="feature in features"
          :key="feature.id"
          :title="feature.title"
          :description="feature.description"
          :mediaUrl="feature.mediaUrl"
          mediaType="gif" 
          class="feature-card"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticlesBackground from '~/components/ParticlesBackground.vue';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: number;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'gif';
  customClass?: string; // Ajout d'une propriété pour une classe personnalisée
}

const features = ref<Feature[]>([
  {
    id: 1,
    title: "Navigating Risks",
    description: "Understand and mitigate potential risks in your blockchain operations with our advanced security measures.",
    mediaUrl: "/3d/gif_3D_1.gif",
    mediaType: 'gif'
  },
  {
    id: 2,
    title: "What is High-Frequency Trading?",
    description: "Explore the world of high-frequency trading and how our platform can help you succeed.",
    mediaUrl: "/3d/gif_3D_2.gif",
    mediaType: 'gif'
  },
  {
    id: 3,
    title: "Profit with Prudence",
    description: "Learn how to maximize your returns while maintaining a prudent approach to blockchain trading.",
    mediaUrl: "/3d/gif_3D_3.gif",
    mediaType: 'gif',
    customClass: 'zoom-gif' // Classe personnalisée pour le zoom
  }
]);

onMounted(() => {
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
        toggleActions: 'play none none reverse',
        markers: true // Retirez en production
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

/* Zoom sur le troisième GIF */
.zoom-gif {
  transform: scale(1.1); /* Ajustez la valeur pour plus ou moins de zoom */
  transform-origin: center; /* Centre le zoom */
}
</style>