import { createContext, useState, useEffect, useCallback } from 'react';
import type { AuthUser } from '../types/auth';
import { tokenStorage } from '../lib/tokenStorage';
import apiClient from '../lib/apiClient';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate user from stored token on first load
  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    apiClient
      .get<AuthUser>('/auth/me')
      .then(({ data }) => setUser(data))
      .catch(() => tokenStorage.clearTokens())
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (accessToken: string, refreshToken: string) => {
    tokenStorage.setTokens(accessToken, refreshToken);
    const { data } = await apiClient.get<AuthUser>('/auth/me');
    setUser(data);
  }, []);

  const logout = useCallback(() => {
    const refreshToken = tokenStorage.getRefreshToken();
    if (refreshToken) {
      // Fire-and-forget: invalidate the refresh token on the server
      apiClient.post('/auth/logout', { refresh_token: refreshToken }).catch(() => {});
    }
    tokenStorage.clearTokens();
    setUser(null);
  }, []);

  const updateUser = useCallback((updated: AuthUser) => {
    setUser(updated);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
