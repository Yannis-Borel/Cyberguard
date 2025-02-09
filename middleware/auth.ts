// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
    const { $supabase } = useNuxtApp();
    
    try {
      // Vérifie la session en cours
      const { data: { session }, error } = await $supabase.auth.getSession();
      
      // Si pas de session et pas sur la page de connexion, redirige vers connexion
      if (!session && to.path !== '/connexion') {
        return navigateTo('/connexion');
      }
      
      // Si on a une session et qu'on est sur la page de connexion, redirige vers l'accueil
      if (session && to.path === '/connexion') {
        return navigateTo('/');
      }
    } catch (error) {
      console.error('Erreur de vérification de session:', error);
      return navigateTo('/connexion');
    }
  });