<template>
    <section class="relative h-screen w-full overflow-hidden bg-black">
      <!-- Video Background -->
      <video 
        autoplay 
        loop 
        muted 
        playsinline
        class="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/video/BG_LastComponent.mp4" type="video/mp4" />
      </video>
  
      <!-- Pattern overlay -->
      <div 
        class="absolute inset-0 z-10"
        style="
          background-image: radial-gradient(circle, rgba(37, 99, 235, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          background: linear-gradient(to bottom,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
        "
      ></div>
  
      <!-- Contenu centré -->
      <div class="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6">
        <div class="text-center max-w-2xl mx-auto">
        
  
<!-- Titre -->
<h1 
  ref="title"
  class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 
         tracking-wide opacity-0 transition-opacity duration-1000 ease-out"
>
  Testez CyberGuard AI
</h1>

<!-- Sous-titre -->
<p 
  ref="subtitle"
  class="text-base sm:text-lg text-gray-300 mb-8 opacity-0 
         max-w-xl mx-auto transition-opacity duration-1000 ease-out"
>
  Soyez acteur de votre sécurité numérique ! Découvrez une manière ludique et interactive de protéger vos données et de devenir un expert en cybersécurité grâce à notre assistant IA.
</p>

<!-- Boutons -->
<div 
  ref="buttons"
  class="flex flex-col sm:flex-row gap-4 justify-center opacity-0 transition-opacity duration-1000 ease-out"
>
  <NuxtLink  
    to="/CyberGuardAI"

    class="px-8 py-2 bg-black/60 text-white rounded-full
           border border-blue-500/30 hover:bg-black/80
           transition duration-300 backdrop-blur-sm"
  >
    TESTEZ NOTRE IA
  </NuxtLink  >

</div>

        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import gsap from 'gsap';
import { NuxtLink } from '#components';
  
  const logo = ref(null);
  const title = ref(null);
  const subtitle = ref(null);
  const buttons = ref(null);
  
  onMounted(() => {
    // Animation séquentielle
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
    tl.to(logo.value, {
      opacity: 1,
      duration: 1,
      y: 0
    })
    .to(title.value, {
      opacity: 1,
      duration: 1,
      y: 0
    }, '-=0.5')
    .to(subtitle.value, {
      opacity: 1,
      duration: 1,
      y: 0
    }, '-=0.7')
    .to(buttons.value, {
      opacity: 1,
      duration: 1,
      y: 0
    }, '-=0.7');
  });
  </script>