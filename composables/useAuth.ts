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
    const { data: { user: authUser } } = await $supabase.auth.getUser()
    
    if (authUser) {
      const { data } = await $supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()
      
      user.value = data
    }
    loading.value = false
  }

  const signOut = async () => {
    await $supabase.auth.signOut()
    user.value = null
    router.push('/connexion')
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

  onMounted(() => {
    fetchUser()
    
    $supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        fetchUser()
      } else if (event === 'SIGNED_OUT') {
        user.value = null
      }
    })
  })

  return {
    user,
    loading,
    signOut,
    updateProfile
  }
}