import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useProfile } from '../../../hooks/useProfile';
import type { UpdateProfilePayload } from '../../../types/user';
import './Profile.css';

function Profile() {
  const { profile, completion, isLoading, isSaving, error, updateProfile } = useProfile();

  const [form, setForm] = useState<UpdateProfilePayload>({
    name: '',
    bio: '',
    location: '',
    phone: '',
  });

  // Populate form once profile loads
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name ?? '',
        bio: profile.bio ?? '',
        location: profile.location ?? '',
        phone: profile.phone ?? '',
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(form);
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to save. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="profile-view">
        <div className="profile-view-header">
          <h1>My Profile</h1>
          <p>Manage your account details and preferences.</p>
        </div>
        <div className="profile-skeleton">
          <div className="skeleton-block banner" />
          <div className="skeleton-block" />
          <div className="skeleton-block" />
          <div className="skeleton-block tall" />
          <div className="skeleton-block" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-view">
        <div className="profile-error">{error}</div>
      </div>
    );
  }

  const pct = completion?.completion_percentage ?? 0;

  return (
    <div className="profile-view">
      <div className="profile-view-header">
        <h1>My Profile</h1>
        <p>Manage your account details and preferences.</p>
      </div>

      {/* Profile completion banner */}
      {completion && (
        <div className="completion-banner">
          <div className="completion-banner-header">
            <span className="completion-label">Profile Completion</span>
            <span className="completion-pct">{pct}%</span>
          </div>
          <div className="completion-track">
            <div className="completion-fill" style={{ width: `${pct}%` }} />
          </div>
          {completion.is_complete ? (
            <p className="completion-complete">✓ Your profile is complete</p>
          ) : (
            <p className="completion-missing">
              Missing:{' '}
              {completion.missing_fields.map((f) => (
                <span key={f}>{f.replace('_', ' ')}</span>
              ))}
            </p>
          )}
        </div>
      )}

      {/* Profile edit form */}
      <div className="profile-card">
        <h2 className="profile-card-title">Personal Information</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-field">
            <label className="profile-label" htmlFor="email">Email address</label>
            <div className="profile-readonly">{profile?.email}</div>
            <span className="profile-sublabel">Email cannot be changed here.</span>
          </div>

          <div className="profile-field">
            <label className="profile-label" htmlFor="name">Display name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="profile-input"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              maxLength={100}
            />
          </div>

          <div className="profile-field">
            <label className="profile-label" htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              className="profile-textarea"
              placeholder="Tell us a little about yourself and your pet…"
              value={form.bio}
              onChange={handleChange}
              maxLength={500}
            />
          </div>

          <div className="profile-field">
            <label className="profile-label" htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              className="profile-input"
              placeholder="City, State"
              value={form.location}
              onChange={handleChange}
              maxLength={100}
            />
          </div>

          <div className="profile-field">
            <label className="profile-label" htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="profile-input"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={handleChange}
              maxLength={20}
            />
          </div>

          <div className="profile-actions">
            <button type="submit" className="profile-btn-save" disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
