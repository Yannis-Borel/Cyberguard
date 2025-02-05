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
      end: '+=200%',
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        gsap.set('.features-wrapper', {
          visibility: self.progress > 0.4 ? 'visible' : 'hidden'
        });
      }
    }
  });

  const homeTimeline = gsap.timeline();
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

  mainTimeline.add(homeTimeline, 0);
  mainTimeline.to({}, { duration: 0.2 });
  mainTimeline.fromTo('.particles-background',
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    },
    0.5
  );

  const featuresTimeline = gsap.timeline();
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
      0.2 + (index * 0.15)
    );
  });

  mainTimeline.add(featuresTimeline, 0.6);
});
</script>
<template>
  <div class="scroll-container relative overflow-hidden">
    <div class="home-section absolute top-0 left-0 w-full h-screen">
      <BeginHome />
    </div>
    <div class="features-wrapper absolute top-0 left-0 w-full">
      <div class="features-section relative bg-black">
        <div class="sticky top-0"></div>
        <FeaturesSection />
      </div>
      <ThreeDHome />
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
  will-change: transform;
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
</style>