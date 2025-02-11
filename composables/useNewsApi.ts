// composables/useNewsApi.ts
export const useNewsApi = () => {
  const articles = ref<Article[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCyberNews = async () => {
    loading.value = true;
    try {
      const data = await $fetch('/api/news');
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