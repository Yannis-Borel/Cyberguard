export default defineNuxtPlugin(() => {
  const fetchOllamaResponse = async (prompt: string) => {
    try {
      console.log('Sending request to Ollama...');
      
      // Déterminer l'URL de l'API en fonction de l'environnement
      const apiUrl = process.dev 
        ? 'http://193.168.146.163/api/generate'  // Development
        : 'https://193.168.146.163/api/generate'; // Production
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          model: 'tinyllama',
          prompt: prompt,
          stream: false
        }),
        mode: 'cors',
        credentials: 'omit'
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not OK:', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received response:', data);
      return data.response;
    } catch (error) {
      console.error('Ollama error:', error);
      throw error;
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