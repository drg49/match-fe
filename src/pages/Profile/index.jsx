import React, { useState } from 'react';
import * as api from '../../api/authentication';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { notifyError, notifySuccess } from '../../utils/toastMethods';
import { parseError } from '../../utils/helperMethods';
import { TOAST_POSITIONS } from '../../utils/constants';

const { BOTTOM_CENTER } = TOAST_POSITIONS;

const Profile = ({ user }) => {
  console.log('Profile component received user:', user); // Debugging log
  // Manage submission loading state locally
  const [isSaving, setIsSaving] = useState(false);

  const [profileForm, setProfileForm] = useState({
    first_name: user?.firstName || '',
    last_name: user?.lastName || '',
    email: user?.email || '',
    phone_number: user?.phoneNumber || '',
    birthdate: user?.birthdate || '',
    location: user?.location || '',
    height_cm: user?.heightCm || '',
    gender: user?.gender || '',
    interested_in: user?.interestedIn || '',
    bio: user?.bio || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (isSaving) return;

    if (!profileForm.first_name.trim() || !profileForm.email.trim()) {
      notifyError('First Name and Email are required.', BOTTOM_CENTER);
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        ...profileForm,
        height_cm: profileForm.height_cm ? Number(profileForm.height_cm) : null,
        bio: profileForm.bio?.trim() || null,
      };

      await api.updateUser(payload);
      notifySuccess('Profile updated successfully!', BOTTOM_CENTER);
    } catch (err) {
      notifyError(parseError(err), BOTTOM_CENTER);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <Form id="profile-form" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="first_name"
          label="First Name"
          placeholder="First Name"
          change={handleChange}
          value={profileForm.first_name}
          animate
        />
        <Input
          type="text"
          name="last_name"
          label="Last Name"
          placeholder="Last Name"
          change={handleChange}
          value={profileForm.last_name}
          animate
        />
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Email Address"
          change={handleChange}
          value={profileForm.email}
          animate
          preventSpaces
        />
        <Input
          type="tel"
          name="phone_number"
          label="Phone Number"
          placeholder="Phone Number"
          change={handleChange}
          value={profileForm.phone_number}
          animate
        />
        <Input
          type="date"
          name="birthdate"
          label="Birthdate"
          placeholder="Birthdate"
          change={handleChange}
          value={profileForm.birthdate}
          animate
        />
        <Input
          type="text"
          name="location"
          label="Location"
          placeholder="Location"
          change={handleChange}
          value={profileForm.location}
          animate
        />
        <Input
          type="number"
          name="height_cm"
          label="Height (cm)"
          placeholder="Height (cm)"
          change={handleChange}
          value={profileForm.height_cm}
          animate
        />
        <Input
          type="text"
          name="gender"
          label="Gender"
          placeholder="Gender"
          change={handleChange}
          value={profileForm.gender}
          animate
        />
        <Input
          type="text"
          name="interested_in"
          label="Interested In"
          placeholder="Interested In"
          change={handleChange}
          value={profileForm.interested_in}
          animate
        />
        <Input
          type="text"
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself..."
          change={handleChange}
          value={profileForm.bio}
          animate
        />

        <Button
          text="Save Changes"
          id="save-profile-button"
          click={handleSubmit}
          isPrimary
          isLoading={isSaving}
          disabled={isSaving}
        />
      </Form>
    </div>
  );
};

export default Profile;