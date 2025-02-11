// server/api/news.ts
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=cybersecurity&sortBy=publishedAt&language=fr&apiKey=${config.newsApiKey}`
      );
      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message);
      }
      
      return data;
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Une erreur est survenue'
      });
    }
  });