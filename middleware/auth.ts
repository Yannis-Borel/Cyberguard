export default defineNuxtRouteMiddleware(async (to) => {
  const { $supabase } = useNuxtApp();
  
  try {
      const { data: { session }, error } = await $supabase.auth.getSession();
      
      // Si erreur dans la récupération de session
      if (error) throw error;

      // Pages publiques (pas besoin d'authentification)
      const publicPages = ['/connexion', '/'];
      const authRequired = !publicPages.includes(to.path);

      if (!session && authRequired) {
          return navigateTo('/connexion');
      }

      if (session && to.path === '/connexion') {
          return navigateTo('/cyberguardAI');
      }

  } catch (error) {
      console.error('Erreur de vérification de session:', error);
      return navigateTo('/connexion');
  }
});