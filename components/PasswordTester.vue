// components/PasswordTester.vue
<template>
  <div class="text-white">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Testeur de Mot de Passe</h2>

    </div>

    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-zinc-400 mb-2">
          Entrez votre mot de passe
        </label>
        <input
          v-model="password"
          type="text"
          class="w-full px-4 py-2 bg-[#0D1117] border border-zinc-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          placeholder="Mot de passe à tester..."
          @input="analyzePassword"
        />
      </div>

      <div class="space-y-4">
        <div class="relative pt-1">
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-medium text-zinc-400">Force du mot de passe</label>
            <span :class="strengthColor" class="text-sm font-medium">{{ strengthLabel }}</span>
          </div>
          <div class="flex h-2 overflow-hidden bg-[#0D1117] rounded">
            <div
              class="transition-all duration-300"
              :class="strengthColor"
              :style="{ width: `${strength}%` }"
            ></div>
          </div>
        </div>

        <div class="bg-[#0D1117] p-4 rounded-lg">
          <h3 class="text-lg font-medium mb-3">Temps estimé pour le décryptage :</h3>
          <p class="text-2xl font-bold" :class="strengthColor">{{ crackTime }}</p>
        </div>

        <div class="space-y-2">
          <div 
            v-for="(check, index) in checks" 
            :key="index"
            class="flex items-center space-x-2"
          >
            <span 
              class="w-5 h-5 flex items-center justify-center rounded-full"
              :class="check.passed ? 'bg-green-500' : 'bg-zinc-700'"
            >
              <svg v-if="check.passed" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span :class="check.passed ? 'text-white' : 'text-zinc-400'">{{ check.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const password = ref('');
const strength = ref(0);

const checks = ref([
  { text: 'Au moins 8 caractères', passed: false },
  { text: 'Au moins une majuscule', passed: false },
  { text: 'Au moins une minuscule', passed: false },
  { text: 'Au moins un chiffre', passed: false },
  { text: 'Au moins un caractère spécial', passed: false }
]);

const strengthLabel = computed(() => {
  if (strength.value < 20) return 'Très faible';
  if (strength.value < 40) return 'Faible';
  if (strength.value < 60) return 'Moyen';
  if (strength.value < 80) return 'Fort';
  return 'Très fort';
});

const strengthColor = computed(() => {
  if (strength.value < 20) return 'text-red-500';
  if (strength.value < 40) return 'text-orange-500';
  if (strength.value < 60) return 'text-yellow-500';
  if (strength.value < 80) return 'text-green-500';
  return 'text-emerald-500';
});

const crackTime = computed(() => {
  if (!password.value) return 'Instantané';
  
  // Calcul basé sur la complexité
  const length = password.value.length;
  const hasUppercase = /[A-Z]/.test(password.value);
  const hasLowercase = /[a-z]/.test(password.value);
  const hasNumbers = /[0-9]/.test(password.value);
  const hasSpecials = /[^A-Za-z0-9]/.test(password.value);
  
  let possibilities = 0;
  if (hasUppercase) possibilities += 26;
  if (hasLowercase) possibilities += 26;
  if (hasNumbers) possibilities += 10;
  if (hasSpecials) possibilities += 33;
  
  const combinations = Math.pow(possibilities, length);
  const timeInSeconds = combinations / 1000000000; // Suppose 1 milliard de tentatives par seconde
  
  if (timeInSeconds < 1) return 'Instantané';
  if (timeInSeconds < 60) return `${Math.round(timeInSeconds)} secondes`;
  if (timeInSeconds < 3600) return `${Math.round(timeInSeconds / 60)} minutes`;
  if (timeInSeconds < 86400) return `${Math.round(timeInSeconds / 3600)} heures`;
  if (timeInSeconds < 31536000) return `${Math.round(timeInSeconds / 86400)} jours`;
  return `${Math.round(timeInSeconds / 31536000)} ans`;
});

const analyzePassword = () => {
  // Mise à jour des vérifications
  checks.value[0].passed = password.value.length >= 8;
  checks.value[1].passed = /[A-Z]/.test(password.value);
  checks.value[2].passed = /[a-z]/.test(password.value);
  checks.value[3].passed = /[0-9]/.test(password.value);
  checks.value[4].passed = /[^A-Za-z0-9]/.test(password.value);
  
  // Calcul de la force
  strength.value = checks.value.filter(check => check.passed).length * 20;
};

defineEmits<{
  (e: 'close'): void;
}>();
</script>