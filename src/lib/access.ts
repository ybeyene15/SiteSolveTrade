import { supabase } from './supabase'

export interface UserAccess {
  has_paid_access: boolean
  payment_date: string | null
  stripe_customer_id: string | null
}

export async function checkUserAccess(): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('check_user_access')

    if (error) {
      console.error('Error checking user access:', error)
      return false
    }

    return data || false
  } catch (error) {
    console.error('Error checking user access:', error)
    return false
  }
}

export async function getUserAccessDetails(): Promise<UserAccess | null> {
  try {
    const { data, error } = await supabase
      .from('user_access')
      .select('has_paid_access, payment_date, stripe_customer_id')
      .maybeSingle()

    if (error) {
      console.error('Error getting user access details:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error getting user access details:', error)
    return null
  }
}
