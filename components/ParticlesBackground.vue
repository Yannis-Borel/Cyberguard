// components/ParticlesBackground.vue
<template>
  <div ref="particlesContainer" class="particles-container fixed inset-0 z-0 pointer-events-none">
    <div 
      v-for="n in particleCount" 
      :key="n" 
      class="particle" 
      :style="getRandomStyle(n)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const particlesContainer = ref(null);
const particleCount = 150;

const getRandomStyle = (index: number) => {
  const size = Math.random() * 5 + 2;
  const duration = Math.random() * 20 + 15;
  const startPosition = Math.random() * 100;
  const xMovement = (Math.random() - 0.5) * 200;
  const initialDelay = (index / particleCount) * 5;

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${startPosition}%`,
    top: '100%',
    '--opacity': Math.random() * 0.8 + 0.2,
    '--x-movement': `${xMovement}px`,
    animationDelay: `${initialDelay}s`,
    animationDuration: `${duration}s`,
  };
};
</script>

<style scoped>
.particles-container {
  overflow: hidden;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 100%);
  border-radius: 50%;
  animation: float infinite cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: var(--opacity);
  }
  90% {
    opacity: var(--opacity);
  }
  100% {
    transform: translateY(-100vh) translateX(var(--x-movement));
    opacity: 0;
  }
}
</style>