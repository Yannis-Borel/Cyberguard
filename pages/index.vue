<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// Pour chaque page où vous voulez un rafraîchissement

onMounted(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.scroll-container',
      pin: true,
      start: 'top top',
      end: '+=900%', // Augmenté pour plus de temps de scroll
      scrub: 1, // Ajout d'un scrub plus lent pour des transitions plus fluides
      anticipatePin: 1,
      onUpdate: (self) => {
        // Gestion de la visibilité des sections avec des plages ajustées
        gsap.set('.features-wrapper', {
          visibility: self.progress > 0.2 && self.progress < 0.4 ? 'visible' : 'hidden'
        });
        gsap.set('.adn-section', {
          opacity: self.progress > 0.4 && self.progress < 0.8 ? 1 : 0, // Ajusté pour laisser plus de temps
          pointerEvents: self.progress > 0.4 && self.progress < 0.8 ? 'auto' : 'none'
        });
        gsap.set('.last-section', {
          opacity: self.progress > 0.8 ? 1 : 0, // Ajusté pour commencer plus tard
          pointerEvents: self.progress > 0.8 ? 'auto' : 'none'
        });

        // Reset des animations du premier composant lors du retour
        if (self.progress < 0.1) {
          gsap.set(['.home-title', '.home-description', '.home-button'], {
            clearProps: 'all'
          });
        }
      }
    }
  });

  // Timeline du premier composant avec reset amélioré
  const homeTimeline = gsap.timeline();
  homeTimeline
    .to('.video-background', { 
      scale: 1.1, 
      opacity: 0, 
      filter: 'blur(0px)', 
      duration: 0.5, 
      ease: 'power2.inOut',
      overwrite: true 
    }, 0)
    .to('.gradient-overlay', { 
      opacity: 0, 
      duration: 0.5, 
      ease: 'power2.inOut',
      overwrite: true 
    }, 0)
    .to('.home-title', { 
      y: -50, 
      opacity: 0, 
      duration: 0.4, 
      ease: 'power2.inOut',
      overwrite: true 
    }, 0.1)
    .to('.home-description', { 
      y: -30, 
      opacity: 0, 
      duration: 0.4, 
      ease: 'power2.inOut',
      overwrite: true 
    }, 0.2)
    .to('.home-button', { 
      y: -20, 
      opacity: 0, 
      duration: 0.4, 
      ease: 'power2.inOut',
      overwrite: true 
    }, 0.3);

  mainTimeline.add(homeTimeline, 0);

  // Timeline des features
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
        ease: 'power2.out',
        overwrite: true 
      },
      0.2 + (index * 0.15)
    );
  });

  mainTimeline.add(featuresTimeline, 0.4); // Ajusté pour la nouvelle timeline

  // Timeline ADN avec plus de temps
  const adnTimeline = gsap.timeline();
  adnTimeline
    .fromTo('.adn-section .video-background',
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 2, // Augmenté
        ease: 'power4.out',
        overwrite: true 
      }
    )
    .fromTo('.adn-section .gradient-overlay',
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1.5, // Augmenté
        overwrite: true 
      }, 
      '-=2'
    )
    .fromTo('.adn-section .home-title',
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, // Augmenté
        overwrite: true 
      }, 
      '-=1.5'
    )
    .fromTo('.adn-section .home-description',
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, // Augmenté
        overwrite: true 
      }, 
      '-=1.2'
    );

  mainTimeline.add(adnTimeline, 1.5); // Plus de temps avant le début

  // Timeline Last Component
  const lastTimeline = gsap.timeline();
  lastTimeline
    .fromTo('.last-section .video-background',
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        ease: 'power4.out',
        overwrite: true 
      }
    )
    .fromTo('.last-section',
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1,
        overwrite: true 
      },
      '-=1.5'
    )
    .fromTo('.last-section .logo',
      { y: 100, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1,
        overwrite: true 
      },
      '-=1'
    )
    .fromTo('.last-section .title, .last-section .subtitle, .last-section .buttons',
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        overwrite: true 
      },
      '-=0.8'
    );

  mainTimeline.add(lastTimeline, 3.5); // Plus de temps avant le début du dernier composant
});
</script>


<template>
  <div class="scroll-container relative overflow-hidden">
    <!-- Section BeginHome -->
    <div class="home-section absolute top-0 left-0 w-full h-screen">
      <BeginHome />
    </div>

    <!-- Section Features -->
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

    <!-- Section LastComponent -->
    <div class="last-section absolute top-0 left-0 w-full h-screen opacity-0">
      <LastComponent />
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

.adn-section,
.last-section {
  transition: opacity 0.3s ease;
  will-change: opacity, transform;
}

/* Z-index hierarchy */
.home-section { z-index: 1; }
.features-wrapper { z-index: 2; }
.adn-section { z-index: 3; }
.last-section { z-index: 4; }
</style>