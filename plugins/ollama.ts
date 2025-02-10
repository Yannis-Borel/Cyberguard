export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const fetchOllamaResponse = async (prompt: string) => {
    // L'URL de base sera différente en production et en développement
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:11434'
      : 'https://b149-78-245-97-231.ngrok-free.app'

    try {
      const response = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama2',
          prompt: prompt,
          stream: false
        })
      })
      
      const data = await response.json()
      return data.response
    } catch (error) {
      console.error('Ollama error:', error)
      return null
    }
  }

  return {
    provide: {
      ollama: {
        generateResponse: fetchOllamaResponse
      }
    }
  }
})