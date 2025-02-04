<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp, useRouter } from '#app';
import type { User } from '~/types/supabase';

const signUpForm = ref({ email: '', prenom: '', last_name: '', password: '' });
const signInForm = ref({ email: '', password: '' });
const users = ref<User[]>([]);
const currentUser = ref<User | null>(null);
const { $supabase } = useNuxtApp();
const router = useRouter();
const selectedFile = ref<File | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
};

const signUp = async () => {
  const { email, prenom, last_name, password } = signUpForm.value;
  try {
    const { data, error } = await $supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: prenom, last_name: last_name } }
    });
    if (error) throw error;
    let avatar_url = '';
    if (selectedFile.value) {
      const filePath = `avatars/${data.user.id}/${selectedFile.value.name}`;
      const { data: uploadData, error: uploadError } = await $supabase.storage
        .from('user-profile-images')
        .upload(filePath, selectedFile.value);
      if (uploadError) throw uploadError;
      avatar_url = $supabase.storage.from('user-profile-images').getPublicUrl(filePath).data.publicUrl;
    }
    await $supabase.from('users').insert([{ id: data.user.id, email, first_name: prenom, last_name, avatar_url }]);
  } catch (err) {
    console.error('Erreur:', err);
  }
};

const signIn = async () => {
  const { email, password } = signInForm.value;
  try {
    const { data, error } = await $supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    router.push('/monprofil');
  } catch (err) {
    console.error('Erreur:', err);
  }
};

onMounted(async () => {
  const { data, error } = await $supabase.from<'users', User>('users').select('*');
  if (!error) users.value = data || [];
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-4">Inscription</h1>
      <form @submit.prevent="signUp" class="space-y-4">
        <input type="email" v-model="signUpForm.email" placeholder="Email" class="w-full px-4 py-2 border rounded-md" required />
        <input type="text" v-model="signUpForm.prenom" placeholder="Prénom" class="w-full px-4 py-2 border rounded-md" required />
        <input type="text" v-model="signUpForm.last_name" placeholder="Nom" class="w-full px-4 py-2 border rounded-md" required />
        <input type="password" v-model="signUpForm.password" placeholder="Mot de passe" class="w-full px-4 py-2 border rounded-md" required />
        <input type="file" @change="handleFileChange" class="w-full" />
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">S'inscrire</button>
      </form>
    </div>

    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mt-6">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-4">Connexion</h1>
      <form @submit.prevent="signIn" class="space-y-4">
        <input type="email" v-model="signInForm.email" placeholder="Email" class="w-full px-4 py-2 border rounded-md" required />
        <input type="password" v-model="signInForm.password" placeholder="Mot de passe" class="w-full px-4 py-2 border rounded-md" required />
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Se connecter</button>
      </form>
    </div>

    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 class="text-xl font-bold text-gray-800 text-center">Liste des utilisateurs</h2>
      <ul class="mt-4 space-y-2">
        <li v-for="user in users" :key="user.id" class="p-2 bg-gray-200 rounded-md text-gray-700">{{ user.email }} - {{ user.first_name }} {{ user.last_name }}</li>
      </ul>
    </div>
  </div>
</template>
