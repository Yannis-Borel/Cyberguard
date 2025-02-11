// types/supabase.ts

// types/supabase.ts
export type User = {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar_url: string
  username: string
  bio: string
  website_url: string
  location: string
}
export type Conversation = {
  id: string
  user_id: string
  title: string
  created_at: string
  messages?: Message[]
}

export type Message = {
  id: string
  conversation_id: string
  content: string
  type: 'user' | 'assistant'
  created_at: string
}