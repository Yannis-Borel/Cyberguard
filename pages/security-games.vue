<template>
    <section class="min-h-screen bg-black py-16 md:py-20 relative">
      <div class="absolute inset-0 bg-[url('/path/to/grid-pattern.png')] opacity-10"></div>
      
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16 md:mb-20">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Mini-Jeux Cybersécurité
            </h1>
            <p class="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
              Testez vos connaissances et apprenez à vous protéger de manière interactive
            </p>
          </div>
          
          <div class="grid gap-8 md:gap-12">
            <GameBanner
              title="Testeur de Mot de Passe"
              description="Découvrez en combien de temps votre mot de passe pourrait être déchiffré par des pirates informatiques. Apprenez à créer des mots de passe plus sûrs."
              imageUrl="/images/mdp.jpg"
              class="game-banner"
              @click="isPasswordTesterOpen = true"
            />
            
            <GameBanner
              title="Quiz Cybersécurité"
              description="Mettez vos connaissances à l'épreuve avec notre quiz interactif. Découvrez les meilleures pratiques pour protéger vos données."
              imageUrl="/images/quizz.jpg"
              class="game-banner"
              @click="isQuizOpen = true"
            />
          </div>
        </div>
  
        <!-- Modal pour le testeur de mot de passe -->
        <div v-if="isPasswordTesterOpen" class="fixed inset-0 z-50 overflow-y-auto">
          <div class="fixed inset-0 bg-black/90" @click="isPasswordTesterOpen = false"></div>
          <div class="relative min-h-screen flex items-center justify-center p-4">
            <div class="bg-[#070B11] rounded-2xl p-8 w-full max-w-2xl relative z-50">
              <button 
                @click="isPasswordTesterOpen = false"
                class="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <span class="sr-only">Fermer</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <PasswordTester />
            </div>
          </div>
        </div>
  
        <!-- Modal pour le quiz -->
        <div v-if="isQuizOpen" class="fixed inset-0 z-50 overflow-y-auto">
          <div class="fixed inset-0 bg-black/90" @click="isQuizOpen = false"></div>
          <div class="relative min-h-screen flex items-center justify-center p-4">
            <div class="bg-[#070B11] rounded-2xl p-8 w-full max-w-2xl relative z-50">
              <button 
                @click="isQuizOpen = false"
                class="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <span class="sr-only">Fermer</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <SecurityQuiz />
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  gsap.registerPlugin(ScrollTrigger);
  
  const isPasswordTesterOpen = ref(false);
  const isQuizOpen = ref(false);
  
  onMounted(() => {
    const banners = document.querySelectorAll('.game-banner');
    
    gsap.fromTo(banners, 
      {
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: banners[0],
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  </script>