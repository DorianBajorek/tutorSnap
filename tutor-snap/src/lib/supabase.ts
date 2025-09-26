import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Types for our database
export interface WaitlistEntry {
  id?: string
  email: string
  created_at?: string
}

// Function to add email to waitlist
export async function addToWaitlist(email: string) {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        { email, created_at: new Date().toISOString() }
      ])
      .select()

    if (error) {
      console.error('Error adding to waitlist:', error)
      return { success: false, error: error.message }
    }

    console.log('Successfully added to waitlist:', data)
    return { success: true, data }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, error: 'Unexpected error occurred' }
  }
}

// Function to check if email already exists
export async function checkEmailExists(email: string) {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking email:', error)
      return { exists: false, error: error.message }
    }

    return { exists: !!data, error: null }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { exists: false, error: 'Unexpected error occurred' }
  }
}
