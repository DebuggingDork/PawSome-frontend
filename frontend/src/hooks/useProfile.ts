import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/user.service';
import type { UserProfile, UpdateProfilePayload, ProfileCompletion } from '../types/user';

interface UseProfileResult {
  profile: UserProfile | null;
  completion: ProfileCompletion | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  updateProfile: (payload: UpdateProfilePayload) => Promise<UserProfile>;
  refetch: () => void;
}

export function useProfile(): UseProfileResult {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [completion, setCompletion] = useState<ProfileCompletion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [profileData, completionData] = await Promise.all([
        userService.getProfile(),
        userService.getProfileCompletion(),
      ]);
      setProfile(profileData);
      setCompletion(completionData);
    } catch {
      setError('Failed to load profile. Please refresh.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const updateProfile = useCallback(async (payload: UpdateProfilePayload) => {
    setIsSaving(true);
    try {
      const updated = await userService.updateProfile(payload);
      setProfile(updated);
      // Re-fetch completion status after a save
      userService.getProfileCompletion().then(setCompletion).catch(() => {});
      return updated;
    } finally {
      setIsSaving(false);
    }
  }, []);

  return {
    profile,
    completion,
    isLoading,
    isSaving,
    error,
    updateProfile,
    refetch: fetch,
  };
}
