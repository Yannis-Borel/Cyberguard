<template>
  <section class="min-h-screen bg-black py-16 md:py-20 relative">
    <div class="absolute inset-0 bg-[url('/path/to/grid-pattern.png')] opacity-10"></div>
    
    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <div class="max-w-4xl mx-auto">
        <div v-if="user" class="bg-[#070B11] rounded-2xl p-8 md:p-10 shadow-2xl">
          <!-- Profile Header -->
          <div class="relative mb-12">
            <div class="absolute inset-0 h-32 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-2xl opacity-20"></div>
            <div class="relative pt-8">
              <div class="flex flex-col items-center md:items-start gap-2">
                <div class="h-1 w-20 bg-purple-500 rounded"></div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  {{ user.first_name }} {{ user.last_name }}
                </h1>
                <p class="text-zinc-400 text-lg">{{ user.email }}</p>
              </div>
            </div>
          </div>

          <!-- Profile Content -->
          <div v-if="!isEditing" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-[#0A0F16] p-6 rounded-xl border border-zinc-800/50 hover:border-purple-500/30 transition-colors duration-300">
                <h3 class="text-zinc-400 text-sm font-medium mb-2">Prénom</h3>
                <p class="text-white text-lg">{{ user.first_name }}</p>
              </div>
              <div class="bg-[#0A0F16] p-6 rounded-xl border border-zinc-800/50 hover:border-purple-500/30 transition-colors duration-300">
                <h3 class="text-zinc-400 text-sm font-medium mb-2">Nom</h3>
                <p class="text-white text-lg">{{ user.last_name }}</p>
              </div>
            </div>

            <div class="flex flex-wrap gap-4">
              <button 
                @click="startEditing"
                class="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-purple-600/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Modifier le profil</span>
              </button>
              
              <button 
                @click="signOut"
                class="inline-flex items-center space-x-2 bg-[#0A0F16] hover:bg-[#0F1520] text-white px-6 py-3 rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Se déconnecter</span>
              </button>
            </div>
          </div>

          <!-- Edit Form -->
          <form v-else @submit.prevent="saveProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Prénom</label>
                <input
                  v-model="editForm.first_name"
                  type="text"
                  class="w-full px-4 py-3 bg-[#0A0F16] border border-zinc-800 focus:border-purple-500 rounded-lg text-white transition-colors duration-300"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Nom</label>
                <input
                  v-model="editForm.last_name"
                  type="text"
                  class="w-full px-4 py-3 bg-[#0A0F16] border border-zinc-800 focus:border-purple-500 rounded-lg text-white transition-colors duration-300"
                />
              </div>
            </div>

            <div class="flex flex-wrap gap-4">
              <button
                type="submit"
                class="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-purple-600/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Sauvegarder</span>
              </button>
              
              <button
                type="button"
                @click="isEditing = false"
                class="inline-flex items-center space-x-2 bg-[#0A0F16] hover:bg-[#0F1520] text-white px-6 py-3 rounded-lg transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Annuler</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  keepalive: false,
  key: route => route.fullPath
});

const { user, updateProfile, signOut } = useAuth()
const isEditing = ref(false)
const editForm = ref({
  first_name: '',
  last_name: '',
})

const startEditing = () => {
  editForm.value = {
    first_name: user.value?.first_name || '',
    last_name: user.value?.last_name || '',
  }
  isEditing.value = true
}

const saveProfile = async () => {
  await updateProfile(editForm.value)
  isEditing.value = false
}
</script>