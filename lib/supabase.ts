import {createClient} from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabasePublishkey = process.env.SUPABASE_PUBLISH_KEY

export function useSupabase(){
    if(!supabasePublishkey)
}