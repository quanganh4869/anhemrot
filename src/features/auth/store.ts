import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: Cookies.get('token') || null,
  isAuthenticated: !!Cookies.get('token'),
  isLoading: true, // Initially loading to check session
  
  setAuth: (user, token) => {
    Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
    set({ user, token, isAuthenticated: true, isLoading: false });
  },
  
  logout: () => {
    Cookies.remove('token');
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    window.location.href = '/login';
  },
  
  checkSession: async () => {
    const { token, logout } = get();
    if (!token) {
      set({ isLoading: false });
      return;
    }
    
    try {
      // Typically we'd fetch the Backend URL from env (e.g. process.env.NEXT_PUBLIC_API_URL)
      // Hardcoding localhost for this prototype if env not set
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const user = await response.json();
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        // Token expired or invalid
        logout();
      }
    } catch (error) {
      console.error("Auth check failed", error);
      // Don't logout on network error, just stop loading
      set({ isLoading: false });
    }
  }
}));
