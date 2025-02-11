// plugins/ollama.ts
export default defineNuxtPlugin(() => {
  const fetchOllamaResponse = async (prompt: string) => {
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
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