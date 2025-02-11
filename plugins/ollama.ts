export default defineNuxtPlugin(() => {
  const { public: { ollamaUrl } } = useRuntimeConfig()

  const fetchOllamaResponse = async (prompt: string) => {
    try {
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama2',
          prompt: prompt,
          stream: false
        })
      })
      
      return await response.json()
    } catch (error) {
      console.error('Ollama error:', error)
      return { response: "Service temporairement indisponible" }
    }
  }

  return {
    provide: { ollama: { generateResponse: fetchOllamaResponse } }
  }
})