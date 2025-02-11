// components/SecurityQuiz.vue
<template>
  <div class="text-white">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Quiz Cybersécurité</h2>

    </div>

    <div v-if="!isComplete" class="space-y-6">
      <!-- Barre de progression -->
      <div class="flex justify-between items-center mb-4">
        <div class="w-full bg-[#0D1117] h-2 rounded-full overflow-hidden">
          <div 
            class="h-full bg-purple-600 transition-all duration-300"
            :style="{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }"
          ></div>
        </div>
        <span class="ml-4 text-zinc-400 whitespace-nowrap">
          {{ currentQuestionIndex + 1 }}/{{ QUESTIONS.length }}
        </span>
      </div>

      <!-- Question courante -->
      <div class="bg-[#0D1117] p-6 rounded-lg">
        <h3 class="text-lg font-medium mb-4">{{ currentQuestion.question }}</h3>
        
        <!-- Réponses -->
        <div class="space-y-3">
          <button
            v-for="(answer, index) in currentQuestion.answers"
            :key="index"
            @click="handleAnswerClick(index)"
            :disabled="hasAnswered"
            :class="[
              'w-full text-left p-4 rounded-lg transition-all duration-300 relative overflow-hidden',
              getAnswerClass(index)
            ]"
          >
            <span class="relative z-10">{{ answer }}</span>
          </button>
        </div>

        <!-- Explication après réponse -->
        <div 
          v-if="hasAnswered"
          class="mt-4 p-4 rounded-lg"
          :class="isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'"
        >
          <p class="text-sm">{{ currentQuestion.explanation }}</p>
        </div>
      </div>

      <!-- Bouton de validation ou suivant -->
      <button
        v-if="hasAnswered"
        @click="nextQuestion"
        class="w-full py-3 px-6 rounded-lg bg-purple-600 text-white font-medium transition-colors hover:bg-purple-700"
      >
        {{ isLastQuestion ? 'Voir les résultats' : 'Question suivante' }}
      </button>
    </div>

    <!-- Résultats -->
    <div v-else class="text-center space-y-6">
      <div class="bg-[#0D1117] p-6 rounded-lg">
        <h3 class="text-2xl font-bold mb-2">Quiz terminé !</h3>
        <p class="text-xl text-purple-400 mb-4">
          Votre score: {{ score }}/{{ QUESTIONS.length }}
          ({{ Math.round((score / QUESTIONS.length) * 100) }}%)
        </p>
        <p class="text-zinc-400 mb-6">{{ feedback }}</p>
        <button
          @click="resetQuiz"
          class="py-3 px-6 rounded-lg bg-purple-600 text-white font-medium transition-colors hover:bg-purple-700"
        >
          Recommencer le quiz
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Types
interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
}

// Questions du quiz
const QUESTIONS: Question[] = [
  {
    question: "Qu'est-ce qu'une attaque par force brute ?",
    answers: [
      "Une attaque physique sur un serveur",
      "Une tentative systématique de deviner un mot de passe en essayant toutes les combinaisons possibles",
      "Un virus qui force l'ouverture des fichiers",
      "Une attaque qui force le redémarrage d'un système"
    ],
    correctAnswer: 1,
    explanation: "L'attaque par force brute consiste à essayer méthodiquement toutes les combinaisons possibles pour trouver un mot de passe."
  },
  {
    question: "Quelle est la meilleure pratique pour stocker des mots de passe en tant que développeur ?",
    answers: [
      "Les stocker en texte brut dans la base de données",
      "Les encoder en base64",
      "Les hasher avec sel (salt) en utilisant un algorithme sécurisé",
      "Les chiffrer avec une clé symétrique"
    ],
    correctAnswer: 2,
    explanation: "Le hashage avec sel est la méthode la plus sécurisée car elle est irréversible et résistante aux attaques par tables arc-en-ciel."
  },
  {
    question: "Qu'est-ce qu'une attaque par injection SQL ?",
    answers: [
      "Un virus qui corrompt une base de données",
      "Une tentative d'insertion de code SQL malveillant dans une requête",
      "Un script qui ralentit les performances de la base de données",
      "Une attaque qui supprime les tables SQL"
    ],
    correctAnswer: 1,
    explanation: "L'injection SQL exploite les vulnérabilités d'une application pour insérer du code SQL malveillant qui peut compromettre la base de données."
  },
  {
    question: "Quelle est la fonction principale d'un pare-feu (firewall) ?",
    answers: [
      "Accélérer la connexion internet",
      "Stocker des données en cache",
      "Filtrer le trafic réseau selon des règles de sécurité",
      "Crypter les données transmises"
    ],
    correctAnswer: 2,
    explanation: "Un pare-feu surveille et contrôle le trafic réseau entrant et sortant selon des règles de sécurité prédéfinies."
  },
  {
    question: "Qu'est-ce qu'un VPN ?",
    answers: [
      "Un antivirus premium",
      "Un réseau privé virtuel qui chiffre les communications",
      "Un type de virus",
      "Un système de sauvegarde en ligne"
    ],
    correctAnswer: 1,
    explanation: "Un VPN (Virtual Private Network) crée un tunnel chiffré pour sécuriser les communications sur internet."
  },
  {
    question: "Que signifie le 'HTTPS' dans une URL ?",
    answers: [
      "High Transfer Text Protocol System",
      "Hyper Text Transfer Protocol Secure",
      "High Tech Transfer Protocol System",
      "Hyper Text Technical Protocol Secure"
    ],
    correctAnswer: 1,
    explanation: "HTTPS est la version sécurisée du protocole HTTP, utilisant le chiffrement SSL/TLS pour protéger les données transmises."
  },
  {
    question: "Qu'est-ce qu'une attaque DDoS ?",
    answers: [
      "Un virus qui détruit les données",
      "Une attaque qui vole des informations personnelles",
      "Une attaque qui surcharge un service pour le rendre inaccessible",
      "Un logiciel espion"
    ],
    correctAnswer: 2,
    explanation: "Une attaque DDoS (Distributed Denial of Service) vise à rendre un service inaccessible en le submergeant de requêtes."
  },
  {
    question: "Quelle est la meilleure protection contre le phishing ?",
    answers: [
      "Un antivirus puissant",
      "La sensibilisation et la formation des utilisateurs",
      "Un pare-feu configuré",
      "Un VPN actif"
    ],
    correctAnswer: 1,
    explanation: "La formation des utilisateurs est cruciale car le phishing exploite principalement l'erreur humaine plutôt que des failles techniques."
  },
  {
    question: "Qu'est-ce qu'une politique de mot de passe fort exige généralement ?",
    answers: [
      "Uniquement des lettres majuscules",
      "Un mot simple facile à retenir",
      "Au moins 8 caractères avec majuscules, minuscules, chiffres et caractères spéciaux",
      "Le même mot de passe pour tous les services"
    ],
    correctAnswer: 2,
    explanation: "Un mot de passe fort doit être complexe et combiner différents types de caractères pour être difficile à deviner ou à craquer."
  },
  {
    question: "Quel est le principal risque des réseaux Wi-Fi publics ?",
    answers: [
      "Ils sont trop lents",
      "L'interception des données transmises",
      "Ils consomment trop de batterie",
      "Ils ne fonctionnent pas avec tous les appareils"
    ],
    correctAnswer: 1,
    explanation: "Les réseaux Wi-Fi publics sont souvent non sécurisés, permettant l'interception des données par des attaquants."
  }
];

// État du quiz
const currentQuestionIndex = ref(0);
const selectedAnswer = ref<number | null>(null);
const hasAnswered = ref(false);
const score = ref(0);
const isComplete = ref(false);

// Computed properties
const currentQuestion = computed(() => QUESTIONS[currentQuestionIndex.value]);
const isLastQuestion = computed(() => currentQuestionIndex.value === QUESTIONS.length - 1);
const isCorrect = computed(() => selectedAnswer.value === currentQuestion.value.correctAnswer);
const feedback = computed(() => {
  const percentage = (score.value / QUESTIONS.length) * 100;
  if (percentage === 100) return "Excellent ! Vous êtes un expert en cybersécurité !";
  if (percentage >= 80) return "Très bien ! Vous avez de solides connaissances en cybersécurité.";
  if (percentage >= 60) return "Pas mal ! Il y a encore quelques points à approfondir.";
  return "Continuez à vous former pour améliorer vos connaissances en cybersécurité.";
});

// Méthodes
const getAnswerClass = (index: number) => {
  if (!hasAnswered.value) {
    return selectedAnswer.value === index
      ? 'bg-purple-600 text-white'
      : 'bg-[#070B11] text-zinc-400 hover:bg-[#0A0F16] hover:text-white';
  }
  
  if (index === currentQuestion.value.correctAnswer) {
    return 'bg-green-600/20 text-white';
  }
  
  if (index === selectedAnswer.value) {
    return 'bg-red-600/20 text-white';
  }
  
  return 'bg-[#070B11] text-zinc-400';
};

const handleAnswerClick = (index: number) => {
  if (!hasAnswered.value) {
    selectedAnswer.value = index;
    hasAnswered.value = true;
    if (index === currentQuestion.value.correctAnswer) {
      score.value++;
    }
  }
};

const nextQuestion = () => {
  if (isLastQuestion.value) {
    isComplete.value = true;
  } else {
    currentQuestionIndex.value++;
    selectedAnswer.value = null;
    hasAnswered.value = false;
  }
};

const resetQuiz = () => {
  currentQuestionIndex.value = 0;
  selectedAnswer.value = null;
  hasAnswered.value = false;
  score.value = 0;
  isComplete.value = false;
};

defineEmits<{
  (e: 'close'): void;
}>();
</script>