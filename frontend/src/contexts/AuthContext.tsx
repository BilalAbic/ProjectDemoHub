import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import { Admin, LoginCredentials, ApiResponse, LoginResponse } from '@/types';

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true - check auth on mount

  // Check if user is logged in on mount - ONLY ONCE
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      // Only check if we have a token
      const token = localStorage.getItem('accessToken');
      if (!token) {
        if (isMounted) {
          setAdmin(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        console.log('🔍 Checking authentication on page load...');
        const { data } = await api.get<ApiResponse<Admin>>('/admin/me');
        if (isMounted) {
          setAdmin(data.data);
          console.log('✅ User authenticated:', data.data.email);
        }
      } catch (error: any) {
        // If 401, user is not authenticated - this is expected
        if (isMounted) {
          if (error.response?.status === 401) {
            console.log('⚠️ Token invalid, clearing auth');
            localStorage.removeItem('accessToken');
          }
          setAdmin(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const { data } = await api.post<ApiResponse<LoginResponse>>('/admin/login', credentials);
    // Save access token to localStorage
    if (data.data.accessToken) {
      localStorage.setItem('accessToken', data.data.accessToken);
    }
    setAdmin(data.data.admin);
  };

  const logout = async () => {
    await api.post('/admin/logout');
    localStorage.removeItem('accessToken');
    setAdmin(null);
  };

  const refreshToken = async () => {
    try {
      const { data } = await api.post<ApiResponse<{ accessToken: string }>>('/admin/refresh');
      // Save new access token
      if (data.data.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
      }
      // Verify we're still authenticated
      const { data: adminData } = await api.get<ApiResponse<Admin>>('/admin/me');
      setAdmin(adminData.data);
    } catch (error: any) {
      // If refresh fails, clear admin state and token
      if (error.response?.status === 401) {
        localStorage.removeItem('accessToken');
        setAdmin(null);
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

