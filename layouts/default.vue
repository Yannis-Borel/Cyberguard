<template>
  <div :class="{ 'disable-pin-spacer': !isIndexPage }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isIndexPage = computed(() => {
  return route.name === 'index' || route.path === '/' || route.path === '';
});

const isFirstRender = ref(true);
  
  watch(
    () => route.fullPath,
    (newPath, oldPath) => {
      if (!isFirstRender.value && newPath !== oldPath) {
        isFirstRender.value = true;
        window.location.href = newPath;
      } else {
        isFirstRender.value = false;
      }
    }
  );
</script>

<style>
/* La règle s'appliquera sur toutes les pages sauf l'index */
.disable-pin-spacer .pin-spacer {
  height: 0 !important;
  padding: 0 !important;
}
</style>