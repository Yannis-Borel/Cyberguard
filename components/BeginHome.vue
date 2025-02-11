<template>
  <section class="relative h-screen w-full overflow-hidden bg-black">
    <!-- Vidéo avec ajustements optimisés pour toutes les tailles d'écran -->
    <video 
      autoplay 
      loop 
      muted 
      playsinline
      class="video-background absolute top-0 object-cover h-full
             sm:-right-5 sm:w-[10%] 
             md:-right-10 md:w-[85%] 
             lg:-right-5 lg:w-[85%] 
             xl:-right-5 xl:w-[85%] 
             2xl:-right-5 2xl:w-[80%]"
    >
    <source :src="videoUrl" type="video/mp4" />
    </video>

    <!-- Dégradé optimisé -->
    <div class="gradient-overlay absolute inset-y-0 left-0
                sm:block
                sm:w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]" 
         style="
           background: linear-gradient(90deg, 
             rgba(0, 0, 0, 1) 0%,
             rgba(0, 0, 0, 1) 25%, 
             rgba(0, 0, 0, 0.9) 50%,
             rgba(0, 0, 0, 0) 70%
           );
           -webkit-mask-image: radial-gradient(
             circle at 90% 50%, 
             rgba(0, 0, 0, 0) 0%, 
             rgba(0, 0, 0, 0) 30%, 
             black 75%, 
             black 100%
           );
           mask-image: radial-gradient(
             circle at 130% 50%, 
             rgba(0, 0, 0, 0) 0%, 
             rgba(0, 0, 0, 0) 30%, 
             black 75%, 
             black 100%
           );
         "
    ></div>

    <!-- Contenu -->
    <div class="relative z-10 container mx-auto h-full flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12">
      <div class="max-w-xs sm:max-w-sm text-center sm:text-left mx-auto sm:mx-0 xl:ml-8">
        <h1 ref="title" class="home-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-4 sm:mb-6">
          CYBERGUARD
        </h1>
        <p ref="description" class="home-description text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
          Apprenez les meilleures pratiques en cybersécurité grâce à notre IA intégrée expert en cybersécurité.
        </p>

        <div>
          <NuxtLink
            ref="button"
            class="home-button inline-flex items-center px-6 py-2 sm:px-8 sm:py-3 
                   bg-white/10 hover:bg-white/20 text-white 
                   rounded-full backdrop-blur-sm transition-colors
                   text-sm sm:text-base"
            to="/CyberGuardAI"
          >
            Testez notre IA
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
const videoUrl = '/video/Video_violet.mp4';
// Références pour les éléments à animer
const title = ref(null);
const description = ref(null);
const button = ref(null);

onMounted(() => {
  // Animation pour le titre
  gsap.from(title.value, {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: 'power2.out',
  });

  // Animation pour la description
  gsap.from(description.value, {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power2.out',
    delay: 0.5,
  });

  // Animation pour le bouton
  gsap.from(button.value, {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power2.out',
    delay: 1,
  });
});
</script>
