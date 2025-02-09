<template>
    <div>
      <slot />
    </div>
  </template>
  
  <script setup lang="ts">
  // const route = useRoute();
  // const isFirstRender = ref(true);
  
  // watch(
  //   () => route.fullPath,
  //   (newPath, oldPath) => {
  //     if (!isFirstRender.value && newPath !== oldPath) {
  //       isFirstRender.value = true;
  //       window.location.href = newPath;
  //     } else {
  //       isFirstRender.value = false;
  //     }
  //   }
  // );
  </script>