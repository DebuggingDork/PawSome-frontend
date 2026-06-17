import apiClient from '../lib/apiClient';
import type { AuthTokens, LoginPayload, RegisterPayload } from '../types/auth';

export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthTokens>('/auth/login', payload).then((r) => r.data),

  register: (payload: RegisterPayload) =>
    apiClient.post('/auth/register', payload).then((r) => r.data),

  logout: (refreshToken: string) =>
    apiClient.post('/auth/logout', { refresh_token: refreshToken }),

  refresh: (refreshToken: string) =>
    apiClient.post<AuthTokens>('/auth/refresh', { refresh_token: refreshToken }).then((r) => r.data),
};
