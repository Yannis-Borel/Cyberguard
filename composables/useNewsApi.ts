export const useNewsApi = () => {
    const config = useRuntimeConfig();
    const articles = ref<Article[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
  
    const fetchCyberNews = async () => {
      loading.value = true;
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=cybersecurity&sortBy=publishedAt&language=fr&apiKey=b286b57e1c8940609d9132441ee3311e`
        );
        const data = await response.json();
        
        if (data.status === 'error') {
          throw new Error(data.message);
        }
        
        articles.value = data.articles;
      } catch (e) {
        error.value = e instanceof Error ? e.message : 'Une erreur est survenue';
      } finally {
        loading.value = false;
      }
    };
  
    return {
      articles,
      loading,
      error,
      fetchCyberNews,
    };
  };