<!-- Connexion.vue -->


<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from '#app';
import { useNuxtApp } from '#app';

const router = useRouter();
const { $supabase } = useNuxtApp();
const showLogin = ref(true); // Contrôle l'affichage des formulaires
// États pour les messages d'erreur
const errorMessage = ref('');

// Formulaire de connexion
const signInForm = ref({
  email: '',
  password: ''
});

// Formulaire d'inscription
const signUpForm = ref({
  email: '',
  prenom: '',
  last_name: '',
  password: ''
});

const signIn = async () => {
  try {
    const { error } = await $supabase.auth.signInWithPassword({
      email: signInForm.value.email,
      password: signInForm.value.password
    });

    if (error) {
      errorMessage.value = 'Email ou mot de passe incorrect.';
      return;
    }

    // Utilisez await avec navigateTo
    await navigateTo('/cyberguardAI', { replace: true });

  } catch (err) {
    errorMessage.value = 'Une erreur est survenue lors de la connexion.';
  }
};

// Gestion de l'inscription
const signUp = async () => {
  try {
    const { data, error } = await $supabase.auth.signUp({
      email: signUpForm.value.email,
      password: signUpForm.value.password,
      options: {
        data: {
          first_name: signUpForm.value.prenom,
          last_name: signUpForm.value.last_name
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        errorMessage.value = 'Cet email est déjà utilisé.';
      } else {
        errorMessage.value = 'Une erreur est survenue lors de l\'inscription.';
      }
      return;
    }

    // Redirection vers /cyberguardAI si l'inscription réussit
    router.push('/cyberguardAI');

  } catch (err) {
    errorMessage.value = 'Une erreur est survenue lors de l\'inscription.';
  }
};
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Conteneur vidéo -->
    <div class="relative hidden lg:block flex-1 bg-black/80">
      <video 
        autoplay
        muted
        loop
        playsinline
        class="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none"
      >
        <source src="/video/connexion.mp4" type="video/mp4">
      </video>
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Conteneur principal -->
    <div class="flex-1 flex flex-col justify-center items-center p-8 bg-gray-900/95 backdrop-blur-sm">
      <div class="w-full max-w-md">
        <!-- En-tête -->
        <div class="text-center">
          <h1 class="text-4xl font-bold text-white mb-2">Bienvenue</h1>
          <p class="text-gray-300">Gérez votre compte</p>
        </div>

        <!-- Affichage des erreurs -->
        <div v-if="errorMessage" class="bg-red-500/20 p-4 rounded-lg text-red-400 text-sm mt-8">
          {{ errorMessage }}
        </div>

        <!-- Navigation par onglets -->
        <div class="flex justify-center mt-8">
          <button 
            @click="showLogin = true"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-all mr-4',
              showLogin 
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            ]"
          >
            Connexion
          </button>
          <button 
            @click="showLogin = false"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-all',
              !showLogin 
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            ]"
          >
            Inscription
          </button>
        </div>

        <!-- Formulaire de Connexion -->
        <div v-if="showLogin" class="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700/50 mt-8">
          <form @submit.prevent="signIn">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                v-model="signInForm.email"
                required
                class="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="exemple@email.com"
              />
            </div>
            
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
              <input
                type="password"
                v-model="signInForm.password"
                required
                class="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/20 mt-6"
            >
              Se connecter →
            </button>
          </form>
        </div>

        <!-- Formulaire d'Inscription -->
        <div v-else class="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700/50 mt-8">
          <form @submit.prevent="signUp">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                v-model="signUpForm.email"
                required
                class="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="exemple@email.com"
              />
            </div>

            <div class="grid grid-cols-2 gap-4 mt-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Prénom</label>
                <input
                  type="text"
                  v-model="signUpForm.prenom"
                  required
                  class="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jean"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Nom</label>
                <input
                  type="text"
                  v-model="signUpForm.last_name"
                  required
                  class="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dupont"
                />
              </div>
            </div>

            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
              <input
                type="password"
                v-model="signUpForm.password"
                required
                class="w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/20 mt-6"
            >
              Créer un compte →
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>/* Ajoutez ces styles pour améliorer l'interactivité */
button {
  user-select: none;
}

video::-webkit-media-controls {
  display: none !important;
}

/* Animation subtle pour les transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}</style>