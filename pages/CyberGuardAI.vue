<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-center">CyberGuard AI Assistant</h1>
    <div class="max-w-4xl mx-auto">
      <CyberAssistant />
    </div>
  </div>
</template>

<script setup lang="ts">
// Pour chaque page où vous voulez un rafraîchissement
definePageMeta({
  keepalive: false,
  key: route => route.fullPath,
  middleware: ['auth']
});
</script>