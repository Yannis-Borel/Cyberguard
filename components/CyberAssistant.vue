<template>
    <div class="cyber-assistant bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto">
      <div class="chat-container h-[500px] overflow-y-auto mb-4 space-y-4">
        <div 
          v-for="(message, index) in messages" 
          :key="index" 
          class="p-3 rounded-lg max-w-[80%]"
          :class="message.type === 'user' ? 'bg-blue-100 ml-auto' : 'bg-green-100 mr-auto'"
        >
          {{ message.content }}
        </div>
      </div>
      
      <form @submit.prevent="sendMessage" class="flex">
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
  </template>
<script setup lang="ts">
const { $ollama } = useNuxtApp()

const messages = ref([
  { 
    type: 'assistant', 
    content: 'Bonjour ! Je suis votre assistant spécialisé en cybersécurité.' 
  }
])
const userInput = ref('')
const isLoading = ref(false)

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

  messages.value.push({ 
    type: 'user', 
    content: userInput.value 
  })

  try {
    const keywordsCyberSecurity = [
      'mot de passe', 'sécurité', 'hack', 'piratage', 'cryptage', 
      'chiffrement', 'pare-feu', 'protection', 'authentification', 
      'confidentialité', 'réseau', 'vulnérabilité', 'attaque', 'phishing'
    ]

    const containsCyberSecurityKeywords = keywordsCyberSecurity.some(keyword => 
      userInput.value.toLowerCase().includes(keyword)
    )

    let isCyberSecurity = containsCyberSecurityKeywords

    // Vérification secondaire par l'IA
    if (!isCyberSecurity) {
      isCyberSecurity = await isCyberSecurityTopic(userInput.value)
    }

    if (!isCyberSecurity) {
      messages.value.push({ 
        type: 'assistant', 
        content: 'Je ne peux répondre qu\'aux questions concernant la cybersécurité.' 
      })
      isLoading.value = false
      userInput.value = ''
      return
    }

    const aiResponse = await $ollama.generateResponse(
      `Réponds UNIQUEMENT en français et de manière technique à cette question de cybersécurité : ${userInput.value}`
    )

    if (aiResponse) {
      messages.value.push({ 
        type: 'assistant', 
        content: aiResponse 
      })
    }
  } catch (error) {
    console.error('Erreur', error)
    messages.value.push({ 
      type: 'assistant', 
      content: 'Un problème technique est survenu.' 
    })
  } finally {
    isLoading.value = false
    userInput.value = ''
  }
}
</script>