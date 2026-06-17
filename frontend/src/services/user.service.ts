import apiClient from '../lib/apiClient';
import type { UserProfile, UpdateProfilePayload, ProfileCompletion } from '../types/user';

export const userService = {
  getProfile: () =>
    apiClient.get<UserProfile>('/users/me').then((r) => r.data),

  updateProfile: (payload: UpdateProfilePayload) =>
    apiClient.patch<UserProfile>('/users/me', payload).then((r) => r.data),

  getProfileCompletion: () =>
    apiClient.get<ProfileCompletion>('/users/me/profile-completion').then((r) => r.data),
};
