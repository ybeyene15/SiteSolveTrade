import { createContext, useContext, useEffect, useState } from 'react';
import { adminAuth, AdminAuthState } from '../../lib/admin-auth';
import type { User } from '@supabase/supabase-js';

interface AdminAuthContextType extends AdminAuthState {
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      const { user: currentUser, isAdmin: adminStatus } = await adminAuth.getCurrentAdmin();

      if (mounted) {
        setUser(currentUser);
        setIsAdmin(adminStatus);
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = adminAuth.onAuthStateChange((user, isAdmin) => {
      if (mounted) {
        setUser(user);
        setIsAdmin(isAdmin);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error, isAdmin: adminStatus } = await adminAuth.signIn(email, password);

    if (!error && adminStatus) {
      const { user: currentUser } = await adminAuth.getCurrentAdmin();
      setUser(currentUser);
      setIsAdmin(true);
    }

    setLoading(false);
    return { error };
  };

  const signOut = async () => {
    setLoading(true);
    await adminAuth.signOut();
    setUser(null);
    setIsAdmin(false);
    setLoading(false);
  };

  return (
    <AdminAuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
