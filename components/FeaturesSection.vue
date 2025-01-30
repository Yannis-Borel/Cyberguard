<template>
  <section class="py-20 bg-black">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AccueilCardFeatureCard
          v-for="feature in features"
          :key="feature.id"
          :title="feature.title"
          :description="feature.description"
          :videoUrl="feature.videoUrl"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Feature {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
}

const features = ref<Feature[]>([
  {
    id: 1,
    title: "Navigating Risks",
    description: "Understand and mitigate potential risks in your blockchain operations with our advanced security measures.",
    videoUrl: "/assets/video/Video_accueil.mp4"
  },
  {
    id: 2,
    title: "What is High-Frequency Trading?",
    description: "Explore the world of high-frequency trading and how our platform can help you succeed.",
    videoUrl: "/assets/video/Video_accueil.mp4"
  },
  {
    id: 3,
    title: "Profit with Prudence",
    description: "Learn how to maximize your returns while maintaining a prudent approach to blockchain trading.",
    videoUrl: "/assets/video/Video_accueil.mp4"
  }
]);
</script>

<style scoped>
.container {
  perspective: 1000px;
}
</style>