// composables/useChat.ts
import { ref, computed } from 'vue'
import { useNuxtApp } from '#app'
import { useAuth } from './useAuth'
import type { Conversation, Message } from '~/types/supabase'

export const useChat = () => {
  const { $supabase } = useNuxtApp()
  const { user } = useAuth()
  
  const conversations = ref<Conversation[]>([])
  const currentConversation = ref<string | null>(null)
  const isLoadingConversations = ref(false)
  
  const fetchConversations = async () => {
    try {
      const { data: { session } } = await $supabase.auth.getSession()
      if (!session?.user) return
      
      isLoadingConversations.value = true
      const { data, error } = await $supabase
        .from('conversations')
        .select('*, messages!messages_conversation_id_fkey(*)')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        conversations.value = data.map(conv => ({
          ...conv,
          messages: conv.messages?.sort((a, b) => 
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          ) || []
        }))
      } else {
        console.error('Error fetching conversations:', error)
      }
    } catch (error) {
      console.error('Error in fetchConversations:', error)
    } finally {
      isLoadingConversations.value = false
    }
  }
  const createConversation = async (firstMessage: string): Promise<Conversation | null> => {
    if (!user.value) return null
  
    // Création de la conversation
    const { data: newConversation, error: convError } = await $supabase
      .from('conversations')
      .insert({
        user_id: user.value.id,
        title: firstMessage.substring(0, 50) + '...'
      })
      .select('*')
      .single()
  
    if (convError || !newConversation) {
      console.error('Error creating conversation:', convError)
      return null
    }
  
    // Création du premier message
    const { data: messageData, error: msgError } = await $supabase
      .from('messages')
      .insert({
        conversation_id: newConversation.id,
        content: firstMessage,
        type: 'user'
      })
      .select('*')
      .single()
  
    if (msgError) {
      console.error('Error creating message:', msgError)
      // Supprimer la conversation si la création du message échoue
      await $supabase
        .from('conversations')
        .delete()
        .eq('id', newConversation.id)
      return null
    }
  
    currentConversation.value = newConversation.id
    await fetchConversations()
    return newConversation
  }

  const addMessage = async (conversationId: string, content: string, type: 'user' | 'assistant') => {
    if (!conversationId) {
      console.error('No conversation ID provided')
      return { error: new Error('No conversation ID') }
    }

    
    const handleSupabaseError = (error: any, context: string) => {
      console.error(`Error in ${context}:`, error)
      if (error.code === '42501') {
        return new Error('Unauthorized access')
      }
      if (error.code === '23503') {
        return new Error('Referenced record does not exist')
      }
      return new Error(error.message || 'An unknown error occurred')
    }
    const fetchConversations = async () => {
  if (!user.value) return
  
  isLoadingConversations.value = true
  const { data, error } = await $supabase
    .from('conversations')
    .select('*, messages!messages_conversation_id_fkey(*)') // Utilisation de l'alias correct
    .eq('user_id', user.value.id)
    .order('created_at', { ascending: false })
  
  if (!error && data) {
    // Trier les messages de chaque conversation
    conversations.value = data.map(conv => ({
      ...conv,
      messages: conv.messages?.sort((a, b) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ) || []
    }))
  } else {
    console.error('Error fetching conversations:', error)
  }
  isLoadingConversations.value = false
}
    const { error } = await $supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        content,
        type
      })
    
    if (error) {
      console.error('Error adding message:', error)
    } else {
      await fetchConversations()
    }
    return { error }
  }

  return {
    conversations,
    currentConversation,
    isLoadingConversations,
    fetchConversations,
    createConversation,
    addMessage
  }
}