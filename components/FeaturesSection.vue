<template>
  <section class="min-h-screen bg-black flex items-center justify-center">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-full px-8">
      <AccueilCardFeatureCard
        v-for="feature in features"
        :key="feature.id"
        :title="feature.title"
        :description="feature.description"
        :mediaUrl="feature.videoUrl"
        mediaType="video"
      />
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
