import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'guest' | 'student' | 'executive';

interface User {
  id: string;
  role: UserRole;
  email?: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (role: UserRole, credentials?: any) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (role: UserRole, credentials?: any) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Supabase authentication
      // Example implementation:
      // const { data, error } = await supabase.auth.signInWithRole(role, credentials);
      // if (error) throw error;

      // For now, create a mock user
      const mockUser: User = {
        id: `user_${Date.now()}`,
        role: role,
        name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
        email: `user@sfss.local`,
      };

      setUser(mockUser);
      console.log('User logged in:', mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Supabase logout
      // Example: await supabase.auth.signOut();

      setUser(null);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: user !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
