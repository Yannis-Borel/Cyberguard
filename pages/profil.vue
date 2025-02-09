<!-- pages/profil.vue -->
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

<template>
  <div class="container mx-auto px-4 py-8 mt-20">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <div v-if="user" class="space-y-6">
        <div class="flex items-center space-x-4">
          <img 
            :src="user.avatar_url || '/default-avatar.png'" 
            alt="Profile" 
            class="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 class="text-2xl font-bold">
              {{ user.first_name }} {{ user.last_name }}
            </h1>
            <p class="text-gray-600">{{ user.email }}</p>
          </div>
        </div>

        <div v-if="!isEditing" class="space-y-4">
          <button 
            @click="startEditing"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Modifier le profil
          </button>
          <button 
            @click="signOut"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ml-4"
          >
            Se déconnecter
          </button>
        </div>

        <form v-else @submit.prevent="saveProfile" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              v-model="editForm.first_name"
              type="text"
              class="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom</label>
            <input
              v-model="editForm.last_name"
              type="text"
              class="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div class="flex space-x-4">
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Sauvegarder
            </button>
            <button
              type="button"
              @click="isEditing = false"
              class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>