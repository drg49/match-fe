import React, { useState } from 'react';

import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';

import * as api from '../../api/authentication';
import { formContainsEmptyValues } from '../../utils/validation';
import { capitalizeWords, parseError } from '../../utils/helperMethods';
import { notifyError } from '../../utils/toastMethods';
import { TOAST_POSITIONS } from '../../utils/constants';

const { BOTTOM_CENTER } = TOAST_POSITIONS;

const Register = ({ isLoading, setIsLoading }) => {
  // Track the registration step (1: Required Credentials, 2: Remaining Optional Details)
  const [step, setStep] = useState(1);

  const [registerForm, setRegisterForm] = useState({
    // Step 1 Fields (Required by DB constraints)
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthdate: '',

    // Step 2 Fields (Remaining schema fields)
    phone_number: '',
    bio: '',
    gender: '',
    interested_in: '',
    height_cm: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Step 1 Data Normalization
  const normalizeAuthData = (form) => ({
    first_name: capitalizeWords(form.first_name.trim()),
    last_name: form.last_name.trim()
      ? capitalizeWords(form.last_name.trim())
      : null,
    email: form.email.trim().toLowerCase(),
    password: form.password,
    birthdate: form.birthdate,
  });

  // Step 2 Data Normalization (Remaining fields only)
  const normalizeProfileData = (form) => ({
    phone_number: form.phone_number.trim() || null,
    bio: form.bio?.trim() || null,
    gender: form.gender || null,
    interested_in: form.interested_in || null,
    height_cm: form.height_cm ? Number(form.height_cm) : null,
    location: form.location.trim() || null,
  });

  // Handles Step 1 Submission
  const handleAuthSubmit = async (e) => {
    e?.preventDefault?.();
    if (isLoading) return;

    // Checks fields with "NOT NULL" constraints in your database
    if (
      formContainsEmptyValues({
        first_name: registerForm.first_name,
        email: registerForm.email,
        password: registerForm.password,
        birthdate: registerForm.birthdate,
      })
    ) {
      notifyError('Please fill required fields', BOTTOM_CENTER);
      return;
    }

    try {
      setIsLoading(true);
      await api.register(normalizeAuthData(registerForm));
      setStep(2);
    } catch (err) {
      notifyError(parseError(err), BOTTOM_CENTER);
    } finally {
      setIsLoading(false);
    }
  };

  // Handles Step 2 Submission
  const handleProfileSubmit = async (e) => {
    e?.preventDefault?.();
    if (isLoading) return;

    try {
      setIsLoading(true);
      await api.updateUser(normalizeProfileData(registerForm));
      window.location.reload();
    } catch (err) {
      notifyError(parseError(err), BOTTOM_CENTER);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      id="register-form"
      onSubmit={step === 1 ? handleAuthSubmit : handleProfileSubmit}
    >
      {step === 1 ? (
        <>
          {/* STEP 1: MANDATORY / AUTH FIELDS */}
          <h2>Create Your Account</h2>
          <br />
          <Input
            type="text"
            name="first_name"
            label="First Name"
            placeholder="First Name *"
            change={handleChange}
            value={registerForm.first_name}
            animate
          />
          <Input
            type="text"
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
            change={handleChange}
            value={registerForm.last_name}
            animate
          />
          <Input
            type="email"
            name="email"
            label="Email Address"
            placeholder="Email *"
            change={handleChange}
            value={registerForm.email}
            animate
            preventSpaces
          />
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Password *"
            change={handleChange}
            value={registerForm.password}
            animate
            preventSpaces
          />
          <Input
            type="date"
            name="birthdate"
            label="Birthdate"
            placeholder="Birthdate *"
            change={handleChange}
            value={registerForm.birthdate}
            animate
          />

          <Button
            text="Continue"
            id="register-button"
            click={handleAuthSubmit}
            isPrimary
            isLoading={isLoading}
            disabled={isLoading}
          />
        </>
      ) : (
        <>
          {/* STEP 2: REMAINING SCHEMA FIELDS */}
          <h2>Complete Your Profile</h2>

          <Input
            type="tel"
            name="phone_number"
            label="Phone Number"
            placeholder="Phone Number"
            change={handleChange}
            value={registerForm.phone_number}
            animate
          />

          <Input
            type="text"
            name="location"
            label="Location"
            placeholder="Location"
            change={handleChange}
            value={registerForm.location}
            animate
          />

          <Input
            type="number"
            name="height_cm"
            label="Height (cm)"
            placeholder="Height (cm)"
            change={handleChange}
            value={registerForm.height_cm}
            animate
          />

          <Input
            type="text"
            name="gender"
            label="Gender"
            placeholder="Gender"
            change={handleChange}
            value={registerForm.gender}
            animate
          />

          <Input
            type="text"
            name="interested_in"
            label="Interested In"
            placeholder="Interested In"
            change={handleChange}
            value={registerForm.interested_in}
            animate
          />

          <Input
            type="text"
            name="bio"
            label="Bio"
            placeholder="Bio"
            change={handleChange}
            value={registerForm.bio}
            animate
          />

          <Button
            text="Complete Profile"
            id="profile-button"
            click={handleProfileSubmit}
            isPrimary
            isLoading={isLoading}
            disabled={isLoading}
          />
        </>
      )}
    </Form>
  );
};

export default Register;
