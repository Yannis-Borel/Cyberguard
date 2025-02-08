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

const isCyberSecurityTopic = async (question: string): Promise<boolean> => {
  try {
    const response = await $ollama.generateResponse(
      `Analyse si la question est liée à la cybersécurité. Réponds UNIQUEMENT par "OUI" ou "NON" en français : ${question}`
    )
    return response.trim().toUpperCase() === 'OUI'
  } catch (error) {
    console.error('Erreur de détection', error)
    return false
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim()) return
  isLoading.value = true

  try {
    if (!currentConversation.value) {
      // Create new conversation
      const newConv = await createConversation(userInput.value)
      if (!newConv) {
        throw new Error('Failed to create conversation')
      }
      currentConversation.value = newConv.id
    } else {
      // Add message to existing conversation
      await addMessage(currentConversation.value, userInput.value, 'user')
    }

    const keywordsCyberSecurity = [
      'mot de passe', 'sécurité', 'hack', 'piratage', 'cryptage',
      'chiffrement', 'pare-feu', 'protection', 'authentification',
      'confidentialité', 'réseau', 'vulnérabilité', 'attaque', 'phishing'
    ]

    const containsCyberSecurityKeywords = keywordsCyberSecurity.some(
      keyword => userInput.value.toLowerCase().includes(keyword)
    )

    let isCyberSecurity = containsCyberSecurityKeywords
    if (!isCyberSecurity) {
      isCyberSecurity = await isCyberSecurityTopic(userInput.value)
    }

    if (!isCyberSecurity) {
      if (currentConversation.value) {
        await addMessage(
          currentConversation.value,
          'Je ne peux répondre qu\'aux questions concernant la cybersécurité.',
          'assistant'
        )
      }
    } else {
      const aiResponse = await $ollama.generateResponse(
        `Réponds UNIQUEMENT en français et de manière technique à cette question de cybersécurité : ${userInput.value}`
      )

      if (aiResponse && currentConversation.value) {
        await addMessage(currentConversation.value, aiResponse, 'assistant')
      }
    }

  } catch (error) {
    console.error('Error:', error)
    if (currentConversation.value) {
      await addMessage(
        currentConversation.value,
        'Un problème technique est survenu.',
        'assistant'
      )
    }
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