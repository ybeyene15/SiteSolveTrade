import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export interface AdminAuthState {
  user: User | null
  isAdmin: boolean
  loading: boolean
}

export const adminAuth = {
  async signIn(email: string, password: string) {
    console.log('adminAuth.signIn: Attempting Supabase sign in');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('adminAuth.signIn: Supabase error', error);
      return { data: null, error, isAdmin: false }
    }

    if (!data.user) {
      console.error('adminAuth.signIn: No user returned');
      return { data: null, error: new Error('No user returned'), isAdmin: false }
    }

    console.log('adminAuth.signIn: User authenticated, checking admin status');
    const isAdmin = await this.checkIsAdmin(data.user.id)
    console.log('adminAuth.signIn: Is admin?', isAdmin);

    if (!isAdmin) {
      console.log('adminAuth.signIn: Not an admin, signing out');
      await supabase.auth.signOut()
      return {
        data: null,
        error: new Error('Unauthorized: Admin access required'),
        isAdmin: false
      }
    }

    console.log('adminAuth.signIn: Success!');
    return { data, error: null, isAdmin: true }
  },

  async checkIsAdmin(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', userId)
      .maybeSingle()

    if (error || !data) {
      return false
    }

    return true
  },

  async getCurrentAdmin() {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return { user: null, isAdmin: false, error }
    }

    const isAdmin = await this.checkIsAdmin(user.id)

    return { user, isAdmin, error: null }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  onAuthStateChange(callback: (user: User | null, isAdmin: boolean) => void) {
    return supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        callback(null, false)
        return
      }

      const isAdmin = await this.checkIsAdmin(session.user.id)
      callback(session.user, isAdmin)
    })
  }
}
