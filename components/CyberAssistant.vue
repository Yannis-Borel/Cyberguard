<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-800 text-white p-4">
      <h2 class="text-xl font-bold mb-4">Conversations</h2>
      <div class="space-y-2">
        <button
          v-for="conv in conversations"
          :key="conv.id"
          @click="loadConversation(conv.id)"
          class="w-full text-left p-2 rounded hover:bg-gray-700"
          :class="currentConversation === conv.id ? 'bg-gray-700' : ''"
        >
          {{ conv.title }}
        </button>
      </div>
      <button
        @click="startNewConversation"
        class="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Nouvelle conversation
      </button>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 flex flex-col">
      <div class="cyber-assistant bg-gray-100 p-6 flex-1 flex flex-col">
        <div class="chat-container flex-1 overflow-y-auto mb-4 space-y-4">
          <div
            v-for="(message, index) in currentMessages"
            :key="index"
            class="p-3 rounded-lg max-w-[80%]"
            :class="message.type === 'user' ? 'bg-blue-100 ml-auto' : 'bg-green-100 mr-auto'"
          >
            {{ message.content }}
          </div>
        </div>

        <form @submit.prevent="sendMessage" class="flex mt-auto">
          <input
            v-model="userInput"
            type="text"
            placeholder="Posez une question de cybersécurité..."
            class="flex-grow p-2 border rounded-l"
          />
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-r"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Chargement...' : 'Envoyer' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const motsCleCyberSecurite = [
  'mot de passe', 'sécurité', 'hack', 'piratage', 'cryptage',
  'chiffrement', 'pare-feu', 'protection', 'authentification',
  'confidentialité', 'réseau', 'vulnérabilité', 'attaque', 'phishing',
  'virus', 'malware', 'ransomware', 'données', 'cybercriminalité',
  'backdoor', 'ddos', 'firewall', 'proxy', 'vpn', 'certificat',
  'surveillance', 'espionnage', 'intrusion', 'antivirus'
]

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

const isCyberSecurityTopic = async (question: string): Promise<boolean> => {
  try {
    const prompt = `En tant qu'expert en cybersécurité, analyse si cette question concerne la cybersécurité. 
    Réponds uniquement par OUI ou NON : "${question}"`
    
    const response = await $ollama.generateResponse(prompt)
    return response.trim().toUpperCase() === 'OUI'
  } catch (error) {
    console.error('Erreur de détection du sujet:', error)
    return false
  }
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

    const containsKeywords = motsCleCyberSecurite.some(
      mot => userInput.value.toLowerCase().includes(mot.toLowerCase())
    )

    const isCyberSecurity = containsKeywords || await isCyberSecurityTopic(userInput.value)

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

onMounted(() => {
  fetchConversations()
})
</script>