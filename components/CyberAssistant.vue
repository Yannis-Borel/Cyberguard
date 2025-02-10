<!-- CyberAssistant.vue -->


<template>
  
  <div class="flex h-screen overflow-hidden bg-[#0F1117] pt-16">
    <!-- Sidebar with overlay for mobile -->
    <div class="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity" 
         :class="isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
         @click="toggleSidebar">
    </div>
    
    <!-- Sidebar - toujours visible sur desktop (md:translate-x-0) -->
    <div 
      class="fixed md:relative w-64 flex-shrink-0 bg-[#17181E] border-r border-[#2A2B32] flex flex-col h-full overflow-hidden transition-all duration-300 z-40"
      :class="[
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0' // Force l'affichage sur desktop
      ]"
    >
      <!-- New Chat Button -->
      <div class="p-4 border-b border-[#2A2B32]">
        <button
          @click="startNewConversation"
          class="w-full bg-[#2A2B32] hover:bg-[#3F3F46] text-gray-200 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Nouvelle discussion
        </button>
      </div>

      <!-- Conversations List -->
      <div class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2A2B32] scrollbar-track-transparent">
        <div class="p-2 space-y-1">
          <button
            v-for="conv in conversations"
            :key="conv.id"
            @click="loadConversation(conv.id)"
            class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 flex items-center gap-2 truncate"
            :class="currentConversation === conv.id 
              ? 'bg-[#2A2B32] text-white' 
              : 'text-gray-300 hover:bg-[#2A2B32]/50'"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <span class="truncate">{{ conv.title }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Toggle Button - Maintenant centré verticalement -->
    <button 
      @click="toggleSidebar"
      class="fixed top-1/2 -translate-y-1/2 left-4 md:hidden bg-[#2A2B32] p-2 rounded-lg z-50 transition-transform duration-300 hover:bg-[#3F3F46]"
      :class="isSidebarOpen ? 'rotate-180' : ''"
    >
      <svg class="w-6 h-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>

    <!-- Chat Area -->
    <div class="flex-1 flex flex-col h-full overflow-hidden relative w-full">
      <div class="flex-1 overflow-hidden">
        <!-- Messages Container -->
        <div class="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#2A2B32] scrollbar-track-transparent px-4 pt-8 pb-32">
          <div class="max-w-3xl mx-auto space-y-6">
            <div
              v-for="(message, index) in currentMessages"
              :key="index"
              class="animate-fade-in flex"
              :class="message.type === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div
                class="p-4 rounded-2xl text-sm leading-6 max-w-[85%] md:max-w-[75%]"
                :class="message.type === 'user' 
                  ? 'bg-[#2A2B32] text-white rounded-br-none'
                  : 'bg-[#17181E] text-gray-200 rounded-bl-none'"
              >
                {{ message.content }}
              </div>
            </div>

            <!-- Typing Indicator -->
            <div v-if="isLoading" class="flex justify-start">
              <div class="p-4 bg-[#17181E] text-gray-200 rounded-2xl rounded-bl-none">
                <div class="flex space-x-2">
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="absolute bottom-0 left-0 right-0 bg-[#0F1117]/80 backdrop-blur-sm border-t border-[#2A2B32]">
        <div class="max-w-3xl mx-auto px-4 py-4">
          <form @submit.prevent="sendMessage" class="relative">
            <input
              v-model="userInput"
              type="text"
              placeholder="Posez votre question de cybersécurité..."
              class="w-full px-4 py-3 pr-12 bg-[#17181E] text-gray-200 rounded-xl border border-[#2A2B32] 
                     focus:outline-none focus:ring-2 focus:ring-[#3F3F46] focus:border-transparent
                     placeholder-gray-500 text-sm transition-all"
              :disabled="isLoading"
            />
            <button
              type="submit"
              class="absolute right-2 top-2 p-2 hover:bg-[#2A2B32] rounded-lg transition-colors disabled:opacity-50"
              :disabled="isLoading"
            >
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Scrollbar styles */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-[#2A2B32] {
  scrollbar-color: #2A2B32 transparent;
}

.scrollbar-track-transparent {
  scrollbar-track-color: transparent;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #2A2B32;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3F3F46;
}
</style>


<script setup lang="ts">
import { ref } from 'vue'
import type { Conversation, Message } from '~/types/supabase'

const { $ollama } = useNuxtApp()
const {
  conversations,
  currentConversation,
  createConversation,
  addMessage,
  fetchConversations
} = useChat()

const userInput = ref('')
const isLoading = ref(false)
const isSidebarOpen = ref(window?.innerWidth >= 768)
import { watch } from 'vue'

// Dans le setup script
const { $supabase } = useNuxtApp()

watch(
  () => $supabase.auth.getSession(),
  async () => {
    await fetchConversations()
  },
  { immediate: true }
)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
const currentMessages = computed<Message[]>(() => {
  if (!currentConversation.value) return []
  const conv = conversations.value.find(c => c.id === currentConversation.value)
  return conv?.messages || []
})

const loadConversation = (id: string) => {
  currentConversation.value = id
}

const startNewConversation = () => {
  currentConversation.value = null
}

const cybersecKeywords = {
  // Termes généraux
  securite: ['securite', 'sécurité', 'secu', 'sécu', 'security', 'secure'],
  piratage: ['piratage', 'pirate', 'pirat', 'hack', 'hacking', 'hacker', 'hackeur', 'haxor', 'h4x0r'],
  attaque: ['attaque', 'attack', 'attak', 'ataque', 'attaq'],
  
  // Authentification et accès
  motdepasse: ['motdepasse', 'mot de passe', 'mdp', 'password', 'pwd', 'pass', 'passwd'],
  authentification: ['authentification', 'auth', 'authentif', 'authentication', 'autentification'],
  identifiant: ['identifiant', 'login', 'id', 'username'],
  
  // Protection et défense
  antivirus: ['antivirus', 'anti-virus', 'av', 'antiv'],
  parefeu: ['parefeu', 'pare-feu', 'firewall', 'fw'],
  vpn: ['vpn', 'vpns', 'virtual private network'],
  proxy: ['proxy', 'proxies', 'prox'],
  
  // Chiffrement et cryptographie
  chiffrement: ['chiffrement', 'chiffrage', 'cryptage', 'encryption', 'encrypt', 'encoded'],
  cryptographie: ['cryptographie', 'crypto', 'cryptography', 'crypt'],
  certificat: ['certificat', 'cert', 'certificate', 'certification'],
  
  // Menaces et malwares
  virus: ['virus', 'viru', 'malware', 'maliciels', 'malwareBytes'],
  ransomware: ['ransomware', 'ransom', 'rançon', 'rançongiciel', 'ransomwar'],
  malware: ['malware', 'malicious', 'malveillant', 'maliciels'],
  spyware: ['spyware', 'spy', 'espion', 'espionage', 'espionnage'],
  rootkit: ['rootkit', 'root', 'rootkits'],
  keylogger: ['keylogger', 'keylog', 'keystroke'],
  botnet: ['botnet', 'bot', 'robot', 'botnet'],
  
  // Attaques spécifiques
  phishing: ['phishing', 'fishing', 'fishing', 'hameçonnage', 'hameconnage', 'scam'],
  ddos: ['ddos', 'dos', 'denial of service', 'deni de service'],
  xss: ['xss', 'cross site scripting', 'cross-site'],
  sqlinjection: ['sql', 'injection sql', 'sqlinjection'],
  
  // Infrastructure et réseau
  reseau: ['reseau', 'réseau', 'network', 'net', 'rezo'],
  serveur: ['serveur', 'server', 'srv'],
  routeur: ['routeur', 'router', 'route'],
  
  // Vulnérabilités et exploits
  vulnerabilite: ['vulnerabilite', 'vulnérabilité', 'vuln', 'vulnerability', 'faille'],
  exploit: ['exploit', 'exploitation', 'zero-day', '0day', 'zeroday'],
  backdoor: ['backdoor', 'backdoor', 'porte dérobée', 'porte derobee'],
  
  // Sécurité des données
  donnees: ['donnees', 'données', 'data', 'datas'],
  confidentialite: ['confidentialite', 'confidentialité', 'confidentiel'],
  fuite: ['fuite', 'leak', 'leaks', 'breach', 'databreach'],
  
  // Pratiques de sécurité
  audit: ['audit', 'auditing', 'pentest', 'test d\'intrusion'],
  patch: ['patch', 'correctif', 'mise à jour', 'update'],
  backup: ['backup', 'sauvegarde', 'backup', 'save'],
  
  // Outils et frameworks
  kali: ['kali', 'kali linux', 'kalinux'],
  metasploit: ['metasploit', 'msf', 'meterpreter'],
  wireshark: ['wireshark', 'shark', 'packet sniffer'],
  nmap: ['nmap', 'scan', 'scanner', 'scanning'],
  
  // Conformité et standards
  rgpd: ['rgpd', 'gdpr', 'règlement', 'reglement'],
  iso27001: ['iso27001', 'iso 27001', '27001'],
  pci: ['pci', 'pci dss', 'payment card industry'],
  
  // Termes émergents
  ransomcloud: ['ransomcloud', 'ransom cloud'],
  zerotrust: ['zero trust', 'zerotrust', 'zero-trust'],
  devsecops: ['devsecops', 'devops', 'secopds']
}


const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, '')
}

const isCyberSecurityRelated = (text: string): boolean => {
  const normalizedText = normalizeText(text)
  
  // Vérifier chaque groupe de mots-clés et leurs variantes
  return Object.values(cybersecKeywords).some(variants => {
    return variants.some(variant => {
      const normalizedVariant = normalizeText(variant)
      // Vérifie si le texte contient le mot-clé ou s'il y a une similarité
      return normalizedText.includes(normalizedVariant) ||
             // Distance de Levenshtein simplifiée pour les fautes d'orthographe
             (normalizedVariant.length > 4 && 
              normalizedText.includes(normalizedVariant.slice(0, -2)))
    })
  })
}

const isCyberSecurityTopic = async (question: string): Promise<boolean> => {
  // Vérification par mots-clés d'abord
  if (isCyberSecurityRelated(question)) {
    return true
  }

  // Si aucun mot-clé n'est trouvé, utiliser l'IA pour une analyse contextuelle
  try {
    const prompt = `En tant qu'expert en cybersécurité, analyse si cette question concerne la sécurité informatique, le piratage, la protection des données ou des systèmes informatiques.
    Question : "${question}"
    Réponds uniquement par OUI ou NON.`
    
    const response = await $ollama.generateResponse(prompt)
    return response.trim().toUpperCase() === 'OUI'
  } catch (error) {
    console.error('Erreur analyse IA:', error)
    // En cas d'erreur de l'IA, on se base uniquement sur la détection par mots-clés
    return false
  }
}

const formatResponse = (response: string): string => {
  // Limiter la longueur des réponses
  const maxLength = 1000
  if (response.length > maxLength) {
    response = response.substring(0, maxLength) + '...'
  }
  
  // Ajouter des sauts de ligne pour plus de lisibilité
  response = response.replace(/\. /g, '.\n')
  
  return response
}

const generateAIResponse = async (question: string): Promise<string> => {
  const contextPrompt = `Tu es un expert français en cybersécurité. 
  Réponds de manière claire, concise et technique à cette question: "${question}"
  
  Directives:
  - Réponse uniquement en français
  - Maximum 3-4 phrases par réponse
  - Pas de longues introductions
  - Aller droit au but
  - Utiliser un vocabulaire technique approprié
  - Éviter les répétitions et le remplissage
  - Ne pas mentionner que tu es une IA`

  const response = await $ollama.generateResponse(contextPrompt)
  return formatResponse(response)
}

const sendMessage = async () => {
  if (!userInput.value.trim()) return
  isLoading.value = true

  try {
    if (!currentConversation.value) {
      const newConv = await createConversation(userInput.value)
      if (!newConv) {
        throw new Error('Échec de la création de la conversation')
      }
      currentConversation.value = newConv.id
    }

    await addMessage(currentConversation.value, userInput.value, 'user')

    // Utilisation directe de la nouvelle fonction de détection
    const isCyberSecurity = await isCyberSecurityTopic(userInput.value)

    if (!isCyberSecurity) {
      await addMessage(
        currentConversation.value,
        'Je ne peux répondre quaux questions de cybersécurité. Reformulez votre question en lien avec la sécurité informatique.',
        'assistant'
      )
    } else {
      const aiResponse = await generateAIResponse(userInput.value)
      await addMessage(currentConversation.value, aiResponse, 'assistant')
    }

  } catch (error) {
    console.error('Erreur:', error)
    await addMessage(
      currentConversation.value,
      'Une erreur technique est survenue. Veuillez réessayer.',
      'assistant'
    )
  } finally {
    isLoading.value = false
    userInput.value = ''
    await fetchConversations()
  }
}

onMounted(async () => {
  try {
    const { data: { session } } = await $supabase.auth.getSession()
    if (session?.user) {
      await fetchConversations()
    } else {
      // Rediriger vers la page de connexion si nécessaire
      navigateTo('/connexion')
    }
  } catch (error) {
    console.error("Erreur lors du chargement initial des conversations:", error)
  }
  
  // Gestion du responsive
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      isSidebarOpen.value = true
    }
  })
})
</script>