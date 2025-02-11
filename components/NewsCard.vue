// components/NewsCard.vue
<template>
  <div 
    class="feature-card group relative overflow-hidden rounded-xl bg-[#070B11] hover:bg-[#070B11] transition-all duration-500 cursor-pointer flex flex-col items-center justify-between p-6 h-[500px]"
  >
    <div class="flex-grow w-full h-[300px] mb-4 relative overflow-hidden">
      <img 
        :src="article.urlToImage || '/placeholder-news.jpg'"
        :alt="article.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    
    <div class="text-center space-y-4 w-full">
      <div class="text-sm text-zinc-400 mb-2">
        {{ formatDate(article.publishedAt) }} • {{ article.source.name }}
      </div>
      <h3 class="text-2xl font-medium text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
        {{ article.title }}
      </h3>
      <p class="text-zinc-400 text-base transition-colors duration-300 line-clamp-3">
        {{ article.description }}
      </p>
      <a 
        :href="article.url" 
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300 mt-4"
      >
        Lire l'article
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  article: Article;
}>();

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
</script>

