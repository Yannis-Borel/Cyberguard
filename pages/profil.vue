<template>
  <section class="min-h-screen bg-black py-16 md:py-20 relative">
    <div class="absolute inset-0 bg-[url('/path/to/grid-pattern.png')] opacity-10"></div>
    
    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <div class="max-w-4xl mx-auto">
        <div v-if="user" class="bg-[#070B11] rounded-2xl p-8 md:p-10 shadow-2xl">
          <!-- Profile Header -->
          <div class="relative mb-12">
            <div class="absolute inset-0 h-32 rounded-t-2xl opacity-20"></div>
            <div class="relative pt-8">
              <div class="flex flex-col items-center md:items-start gap-2">
                
                <div class="h-1 w-20 bg-purple-500 rounded"></div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  {{ user.first_name }} {{ user.last_name }}
                </h1>
                <p class="text-zinc-400 text-lg">@{{ user.username }}</p>
                <p class="text-zinc-400 text-lg">{{ user.email }}</p>
              </div>
            </div>
          </div>

          <!-- Profile Content -->
          <div v-if="!isEditing" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-[#0A0F16] p-6 rounded-xl border border-zinc-800/50 hover:border-purple-500/30 transition-colors">
                <h3 class="text-zinc-400 text-sm font-medium mb-2">Prénom</h3>
                <p class="text-white text-lg">{{ user.first_name }}</p>
              </div>
              <div class="bg-[#0A0F16] p-6 rounded-xl border border-zinc-800/50 hover:border-purple-500/30 transition-colors">
                <h3 class="text-zinc-400 text-sm font-medium mb-2">Nom</h3>
                <p class="text-white text-lg">{{ user.last_name }}</p>
              </div>
              <div class="bg-[#0A0F16] p-6 rounded-xl border border-zinc-800/50 hover:border-purple-500/30 transition-colors">
                <h3 class="text-zinc-400 text-sm font-medium mb-2">Pseudonyme</h3>
                <p class="text-white text-lg">{{ user.username || '-' }}</p>
              </div>
              <div class="bg-[#0A0F16] p-6 rounded-xl border border-zinc-800/50 hover:border-purple-500/30 transition-colors">
                <h3 class="text-zinc-400 text-sm font-medium mb-2">Localisation</h3>
                <p class="text-white text-lg">{{ user.location || '-' }}</p>
              </div>
            </div>
            
            <div class="bg-[#0A0F16] p-6 rounded-xl border border-zinc-800/50">
              <h3 class="text-zinc-400 text-sm font-medium mb-2">Bio</h3>
              <p class="text-white text-lg whitespace-pre-line">{{ user.bio || 'Aucune bio pour le moment' }}</p>
            </div>
            
            <div v-if="user.website_url" class="bg-[#0A0F16] p-6 rounded-xl border border-zinc-800/50">
              <h3 class="text-zinc-400 text-sm font-medium mb-2">Site Web</h3>
              <a :href="user.website_url" target="_blank" class="text-purple-400 hover:text-purple-300 transition-colors">
                {{ user.website_url }}
              </a>
            </div>

            <div class="flex flex-wrap gap-4">
              <button 
                @click="startEditing"
                class="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-purple-600/20"
              >
                <PencilIcon class="h-5 w-5" />
                <span>Modifier le profil</span>
              </button>
              
              <button 
                @click="signOut"
                class="inline-flex items-center space-x-2 bg-[#0A0F16] hover:bg-[#0F1520] text-white px-6 py-3 rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
              >
                <LogoutIcon class="h-5 w-5 text-red-500" />
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
              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Pseudonyme</label>
                <input
                  v-model="editForm.username"
                  type="text"
                  class="w-full px-4 py-3 bg-[#0A0F16] border border-zinc-800 focus:border-purple-500 rounded-lg text-white transition-colors duration-300"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-zinc-400">Localisation</label>
                <input
                  v-model="editForm.location"
                  type="text"
                  class="w-full px-4 py-3 bg-[#0A0F16] border border-zinc-800 focus:border-purple-500 rounded-lg text-white transition-colors duration-300"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-zinc-400">Bio</label>
              <textarea
                v-model="editForm.bio"
                rows="4"
                class="w-full px-4 py-3 bg-[#0A0F16] border border-zinc-800 focus:border-purple-500 rounded-lg text-white transition-colors duration-300"
              ></textarea>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-zinc-400">Site Web</label>
              <input
                v-model="editForm.website_url"
                type="url"
                class="w-full px-4 py-3 bg-[#0A0F16] border border-zinc-800 focus:border-purple-500 rounded-lg text-white transition-colors duration-300"
              />
            </div>

            <div class="flex flex-wrap gap-4">
              <button
                type="submit"
                :disabled="isLoading"
                class="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-purple-600/20 disabled:opacity-50"
              >
                <CheckIcon class="h-5 w-5" />
                <span>{{ isLoading ? 'Sauvegarde...' : 'Sauvegarder' }}</span>
              </button>
              
              <button
                type="button"
                @click="isEditing = false"
                class="inline-flex items-center space-x-2 bg-[#0A0F16] hover:bg-[#0F1520] text-white px-6 py-3 rounded-lg transition-all duration-300"
              >
                <XMarkIcon class="h-5 w-5" />
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


const { user, updateProfile, signOut } = useAuth()
const isLoading = ref(false)
const isEditing = ref(false)
const editForm = ref({
  first_name: '',
  last_name: '',
  username: '',
  bio: '',
  location: '',
  website_url: ''
})

const startEditing = () => {
  editForm.value = {
    first_name: user.value?.first_name || '',
    last_name: user.value?.last_name || '',
    username: user.value?.username || '',
    bio: user.value?.bio || '',
    location: user.value?.location || '',
    website_url: user.value?.website_url || ''
  }
  isEditing.value = true
}

const handleAvatarUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  try {
    isLoading.value = true
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.value?.id}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    const { error: updateError } = await supabase
      .from('users')
      .update({ avatar_url: publicUrl })
      .eq('id', user.value?.id)

    if (updateError) throw updateError

    if (user.value) user.value.avatar_url = publicUrl
  } catch (error) {
    console.error('Error uploading avatar:', error)
  } finally {
    isLoading.value = false
  }
}

const saveProfile = async () => {
  try {
    isLoading.value = true
    await updateProfile(editForm.value)
    isEditing.value = false
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    isLoading.value = false
  }
}
</script>