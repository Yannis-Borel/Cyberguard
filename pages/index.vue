<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BeginHome from '@/components/BeginHome.vue';
import FeaturesSection from '@/components/FeaturesSection.vue';

// Références pour les composants
const beginHomeRef = ref(null);
const featuresSectionRef = ref(null);

let lastScrollPosition = 0;

const handleScroll = () => {
  const beginHome = beginHomeRef.value;
  const featuresSection = featuresSectionRef.value;

  if (beginHome && featuresSection) {
    const currentScrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (currentScrollPosition > lastScrollPosition) {
      // Scroll vers le bas
      const beginHomeBottom = beginHome.getBoundingClientRect().bottom;
      if (beginHomeBottom <= viewportHeight) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Scroll vers le haut
      const featuresSectionTop = featuresSection.getBoundingClientRect().top;
      if (featuresSectionTop >= 0) {
        beginHome.scrollIntoView({ behavior: 'smooth' });
      }
    }

    lastScrollPosition = currentScrollPosition;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div>
    <div ref="beginHomeRef">
      <BeginHome />
    </div>
    <div ref="featuresSectionRef">
      <FeaturesSection />
    </div>
  </div>
</template>
