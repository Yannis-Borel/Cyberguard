// Index.vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BeginHome from '@/components/BeginHome.vue';
import FeaturesSection from '@/components/FeaturesSection.vue';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  // Nettoyage des ScrollTriggers existants
  ScrollTrigger.getAll().forEach(st => st.kill());
  
  // Timeline principale
  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.scroll-container',
      pin: true,
      start: 'top top',
      end: '+=200%', // Augmenté pour une transition plus longue
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Gestion de la visibilité optimisée
        gsap.set('.features-wrapper', {
          visibility: self.progress > 0.4 ? 'visible' : 'hidden'
        });
      }
    }
  });

  // Timeline pour BeginHome
  const homeTimeline = gsap.timeline();
  
  // Animation de BeginHome (première moitié du scroll)
  homeTimeline
    .to('.video-background', {
      scale: 1.1,
      opacity: 0,
      filter: 'blur(20px)',
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0)
    .to('.gradient-overlay', {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0)
    .to('.home-title', {
      y: -50,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0.1)
    .to('.home-description', {
      y: -30,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0.2)
    .to('.home-button', {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0.3);

  // Ajout de la timeline BeginHome à la timeline principale
  mainTimeline.add(homeTimeline, 0);

  // Pause pour s'assurer que BeginHome est complètement terminé
  mainTimeline.to({}, { duration: 0.2 }); // Pause de transition

  // Timeline pour Features
  const featuresTimeline = gsap.timeline();

  // Animation du titre des features (commence après BeginHome)
  featuresTimeline.fromTo('.features-title', 
    {
      y: 100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    },
    0
  );

  // Animation des cartes
  const cards = gsap.utils.toArray('.feature-card');
  cards.forEach((card, index) => {
    featuresTimeline.fromTo(card,
      {
        y: 100,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      },
      0.2 + (index * 0.15) // Délai plus long entre chaque carte
    );
  });

  // Ajout de la timeline Features à la timeline principale
  mainTimeline.add(featuresTimeline, 0.6); // Commence après la fin de BeginHome
});
</script>

<template>
  <div class="scroll-container relative overflow-hidden">
    <!-- Section BeginHome -->
    <div class="home-section absolute top-0 left-0 w-full h-screen">
      <BeginHome />
    </div>

    <!-- Section Features -->
    <div class="features-wrapper absolute top-0 left-0 w-full min-h-screen">
      <div class="features-section relative bg-black min-h-screen">
        <div class="sticky top-0 pt-16 pb-16">
          <h2 class="features-title text-4xl md:text-5xl text-white text-center font-semibold opacity-0">
            Our Features
          </h2>
        </div>
        <FeaturesSection />
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  height: 100vh;
  overflow: hidden;
}

.home-section {
  position: absolute;
  z-index: 1;
  will-change: transform;
}

.features-wrapper {
  position: absolute;
  z-index: 2;
  visibility: hidden;
  will-change: transform;
}

.features-section {
  position: relative;
  z-index: 2;
}

.features-title,
.feature-card {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Ensure initial state of features is hidden */
.feature-card {
  opacity: 0;
}
</style>