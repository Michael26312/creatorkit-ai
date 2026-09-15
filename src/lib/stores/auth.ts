import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  avatar?: string;
}

interface Subscription {
  plan: 'free' | 'creator' | 'pro' | 'agency';
  status: string;
}

interface AuthStore {
  user: User | null;
  subscription: Subscription | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>(
  persist(
    (set) => ({
      user: null,
      subscription: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (email: string, password: string) => {
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error);
          }

          const data = await res.json();
          set({
            user: data.user,
            subscription: data.subscription,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      signup: async (email: string, password: string, firstName: string, lastName?: string) => {
        try {
          const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, firstName, lastName }),
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error);
          }

          // Don't auto-login after signup, require email verification
          set({ isAuthenticated: false });
        } catch (error) {
          console.error('Signup failed:', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          await fetch('/api/auth/logout', { method: 'POST' });
          set({
            user: null,
            subscription: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.error('Logout failed:', error);
          throw error;
        }
      },

      fetchUser: async () => {
        try {
          const res = await fetch('/api/auth/user');
          if (res.ok) {
            const data = await res.json();
            set({
              user: data,
              subscription: data.subscription,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ isAuthenticated: false, isLoading: false });
          }
        } catch (error) {
          console.error('Failed to fetch user:', error);
          set({ isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => {
        // Use sessionStorage on client-side only
        if (typeof window !== 'undefined') {
          return sessionStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
