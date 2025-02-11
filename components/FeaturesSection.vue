<!-- components/FeaturesSection.vue -->
<template>
  <section class="min-h-screen bg-black py-10 relative flex items-center justify-center">
    <ParticlesBackground />
    
    <div class="container mx-auto px-6 relative z-10 w-full">
      <div 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto"
        ref="cardsContainer"
      >
        <AccueilCardFeatureCard
          v-for="feature in features"
          :key="feature.id"
          :title="feature.title"
          :description="feature.description"
          :mediaUrl="feature.mediaUrl"
          mediaType="gif" 
          :class="['feature-card', feature.customClass]"
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
  customClass?: string;
}

const features = ref<Feature[]>([
  {
    id: 1,
    title: "Maîtriser les Risques",
    description: "Identifiez et atténuez les cybermenaces grâce à des stratégies de protection avancées.",
    mediaUrl: "/3d/gif_3D_1.gif",
    mediaType: 'gif'
  },
  {
    id: 2,
    title: "Qu'est-ce qu'une Cyberattaque ?",
    description: "Explorez les différentes formes d'attaques numériques et apprenez à vous en défendre efficacement.",
    mediaUrl: "/3d/gif_3D_2.gif",
    mediaType: 'gif'
  },
  {
    id: 3,
    title: "Sécurité Numérique Responsable",
    description: "Optimisez votre protection en ligne tout en adoptant des pratiques cybersécurisées.",
    mediaUrl: "/3d/gif_3D_3.gif",
    mediaType: 'gif',
    customClass: 'zoom-gif'
  }
]);

const cardsContainer = ref(null);

onMounted(() => {
  // Animation d'entrée des cartes
  gsap.from('.feature-card', {
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: cardsContainer.value,
      start: 'top bottom-=100',
      end: 'bottom center',
      toggleActions: 'play none none reverse',
    }
  });

  // Animation de flottement continue
  gsap.to('.feature-card', {
    y: '-10px',
    duration: 2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
    stagger: {
      amount: 1,
      from: 'random'
    }
  });
});
</script>

<style scoped>
.feature-card {
  transform: translateY(0);
  opacity: 1;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.zoom-gif {
  transform: scale(1.1);
  transform-origin: center;
}

/* Animation pour le conteneur de la grille */
.grid {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>