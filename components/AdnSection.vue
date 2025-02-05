<template>
 <section class="adn-section relative h-screen w-full overflow-hidden bg-black">
      <!-- Vidéo à gauche, occupant une plus grande largeur -->
      <video 
        autoplay 
        loop 
        muted 
        playsinline
        class="video-background absolute top-0 left-0 object-cover h-full
               w-full sm:w-[75%] md:w-[80%] lg:w-[65%] xl:w-[70%]"
      >
        <source src="/video/video_adn.mp4" type="video/mp4" />
      </video>
  
      <!-- Dégradé étendu vers la gauche pour une meilleure transition -->
      <div class="gradient-overlay absolute inset-y-0 right-0 w-full sm:w-[65%] md:w-[70%] lg:w-[75%] xl:w-[70%]" 
           style="
             background: linear-gradient(270deg, 
               rgba(0, 0, 0, 1) 0%,
               rgba(0, 0, 0, 1) 50%, 
               rgba(0, 0, 0, 0.9) 75%,
               rgba(0, 0, 0, 0) 100%
             );
           "
      ></div>
  
      <!-- Contenu texte légèrement décalé vers la gauche -->
      <div class="absolute right-0 top-0 h-full w-full sm:w-[50%] flex items-center px-6 sm:px-10">
        <div class="max-w-3xl">
          <h1 class="home-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6">
            Maximizing Profits through Strategic Market Coverage
          </h1>
          <p class="home-description text-xs sm:text-sm md:text-base lg:text-lg text-white/90 mb-8">
            Explore advanced strategies to optimize your market positioning and enhance returns. Explore advanced strategies to optimize your market positioning and enhance returns. Explore advanced strategies to optimize your market positioning and enhance returns. Explore advanced strategies to optimize your market positioning and enhance returns. Explore advanced strategies to optimize your market positioning and enhance returns.
          </p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { gsap } from 'gsap';
  
  // Références pour les éléments à animer
  const title = ref(null);
  const description = ref(null);
  
  onMounted(() => {
    // Animation pour le titre
    gsap.from(title.value, {
      duration: 1,
      x: 50,
      opacity: 0,
      ease: 'power2.out',
    });
  
    // Animation pour la description
    gsap.from(description.value, {
      duration: 1,
      x: 50,
      opacity: 0,
      ease: 'power2.out',
      delay: 0.5,
    });
  });
  </script>