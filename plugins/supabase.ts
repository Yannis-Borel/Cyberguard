// import { createClient, SupabaseClient } from '@supabase/supabase-js';

// export default defineNuxtPlugin(() => {
//   const config = useRuntimeConfig();

//   // Vérifie que les valeurs existent et sont bien des chaînes de caractères
//   const supabaseUrl = config.public.supabaseUrl as string;
//   const supabaseKey = config.public.supabaseKey as string;

//   if (!supabaseUrl || !supabaseKey) {
//     throw new Error('Supabase URL ou clé manquante dans la configuration publique.');
//   }

//   const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

//   return {
//     provide: {
//       supabase,
//     },
//   };
// });
