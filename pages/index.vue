<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);
onMounted(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.scroll-container',
      pin: true,
      start: 'top top',
      end: '+=500%',
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Gestion de la visibilité DES DEUX SECTIONS
        gsap.set('.features-wrapper', {
          visibility: self.progress > 0.3 && self.progress < 0.7 ? 'visible' : 'hidden'
        });
        gsap.set('.adn-section', {
          opacity: self.progress > 0.7 ? 1 : 0,
          pointerEvents: self.progress > 0.7 ? 'auto' : 'none'
        });
      }
    }
  });


  const homeTimeline = gsap.timeline();
  homeTimeline
    .to('.video-background', { scale: 1.1, opacity: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.inOut' }, 0)
    .to('.gradient-overlay', { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 0)
    .to('.home-title', { y: -50, opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 0.1)
    .to('.home-description', { y: -30, opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 0.2)
    .to('.home-button', { y: -20, opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 0.3);

  mainTimeline.add(homeTimeline, 0);

  // Animation des cartes
  const featuresTimeline = gsap.timeline();
  const cards = gsap.utils.toArray('.feature-card');
  cards.forEach((card, index) => {
    featuresTimeline.fromTo(card,
      { y: 100, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.4, 
        ease: 'power2.out' 
      },
      0.2 + (index * 0.15)
    );
  });

  mainTimeline.add(featuresTimeline, 0.6);

 // Nouvelle timeline pour AdnSection
 const adnTimeline = gsap.timeline();
  adnTimeline
  
    .fromTo('.adn-section .video-background',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power4.out' }
    )
    .fromTo('.adn-section .gradient-overlay',
      { opacity: 0 },
      { opacity: 1, duration: 1 }, 
      '-=1.5'
    )
    .fromTo('.adn-section .home-title',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }, 
      '-=1'
    )
    .fromTo('.adn-section .home-description',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }, 
      '-=0.8'
    );

  mainTimeline.add(adnTimeline, 2); // Démarre après les cartes
});
</script>

<template>
  <div class="scroll-container relative overflow-hidden">
    <!-- Section BeginHome -->
    <div class="home-section absolute top-0 left-0 w-full h-screen">
      <BeginHome />
    </div>

    <!-- Section Features (RÉACTIVÉE) -->
    <div class="features-wrapper absolute top-0 left-0 w-full">
      <div class="features-section relative bg-black">
        <div class="sticky top-0"></div>
        <FeaturesSection />
      </div>
    </div>

    <!-- Section AdnSection -->
    <div class="adn-section absolute top-0 left-0 w-full h-screen opacity-0">
      <AdnSection />
    </div>
  </div>
</template>
<style scoped>
.scroll-container {
  min-height: 100vh;
  height: auto;
  overflow: visible;
}

.home-section {
  position: absolute;
  z-index: 1;
  will-change: transform;
}

.particles-background {
  position: absolute;
  z-index: 2;
  will-change: transform;
}

.features-wrapper {
  position: absolute;
  z-index: 3;
  visibility: hidden;

  min-height: 100vh;
  height: auto;
}

.features-section {
  position: relative;
  z-index: 3;
  min-height: 100vh;
  height: auto;
}

.features-title,
.feature-card {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.feature-card {
  opacity: 0;
}

.adn-section {
  z-index: 5; 
  transition: opacity 0.3s ease;
  will-change: opacity, transform;
}

/* Ajustez le z-index des autres sections */
.home-section { z-index: 1; }
.features-wrapper { z-index: 2; } /* Augmenté de 3 à 2 */
.adn-section { z-index: 3; } /* Réduit de 5 à 3 */

</style>


