// composables/useAuth.ts
import { ref, onMounted } from 'vue'
import { useNuxtApp, useRouter } from '#app'
import type { User } from '~/types/supabase'

export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const router = useRouter()
  const user = ref<User | null>(null)
  const loading = ref(true)

  const fetchUser = async () => {
    try {
      const { data: { session } } = await $supabase.auth.getSession()
      
      if (session?.user) {
        const { data } = await $supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        if (data) {
          user.value = data
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error)
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    try {
      await $supabase.auth.signOut()
      user.value = null
      router.push('/connexion')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user.value) return

    const { data, error } = await $supabase
      .from('users')
      .update(updates)
      .eq('id', user.value.id)
      .select()
      .single()

    if (!error && data) {
      user.value = data
    }
    return { data, error }
  }

  // Écoute les changements d'état d'authentification
  onMounted(() => {
    fetchUser()
    
    const { data: { subscription } } = $supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await fetchUser()
      } else if (event === 'SIGNED_OUT') {
        user.value = null
        router.push('/connexion')
      }
    })

    // Nettoie l'abonnement quand le composant est démonté
    onUnmounted(() => {
      subscription.unsubscribe()
    })
  })

  return {
    user,
    loading,
    signOut,
    updateProfile,
    fetchUser
  }
}