export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  phone: string | null;
  is_verified: boolean;
  is_profile_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfilePayload {
  name?: string;
  bio?: string;
  location?: string;
  phone?: string;
}

export interface ProfileCompletion {
  is_complete: boolean;
  missing_fields: string[];
  completion_percentage: number;
}
