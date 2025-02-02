<template>
  <section class="min-h-screen bg-black py-20">
    <div class="features-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4">
      <AccueilCardFeatureCard
        v-for="feature in features"
        :key="feature.id"
        :title="feature.title"
        :description="feature.description"
        :mediaUrl="feature.videoUrl"
        mediaType="video"
        class="feature-card"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  mediaType: 'video';
}

const features = ref<Feature[]>([
  {
    id: 1,
    title: "Navigating Risks",
    description: "Understand and mitigate potential risks in your blockchain operations with our advanced security measures.",
    videoUrl: "/video/Video_accueil.mp4",
    mediaType: 'video'
  },
  {
    id: 2,
    title: "What is High-Frequency Trading?",
    description: "Explore the world of high-frequency trading and how our platform can help you succeed.",
    videoUrl: "/video/Video_accueil.mp4",
    mediaType: 'video'
  },
  {
    id: 3,
    title: "Profit with Prudence",
    description: "Learn how to maximize your returns while maintaining a prudent approach to blockchain trading.",
    videoUrl: "/video/Video_accueil.mp4",
    mediaType: 'video'
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
</style>

