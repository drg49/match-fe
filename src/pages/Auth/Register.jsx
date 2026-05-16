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
  const [registerForm, setRegisterForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',

    // 🆕 dating profile fields
    birthdate: '',
    gender: '',
    interested_in: '',
    height_cm: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const normalizeForm = (form) => ({
    first_name: capitalizeWords(form.first_name.trim()),
    last_name: capitalizeWords(form.last_name.trim()),
    email: form.email.trim().toLowerCase(),
    password: form.password,

    birthdate: form.birthdate,
    gender: form.gender || null,
    interested_in: form.interested_in || null,
    height_cm: form.height_cm ? Number(form.height_cm) : null,
    bio: form.bio?.trim() || null,
  });

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    if (isLoading) return;

    if (
      formContainsEmptyValues({
        first_name: registerForm.first_name,
        email: registerForm.email,
        password: registerForm.password,
      })
    ) {
      notifyError('Please fill required fields', BOTTOM_CENTER);
      return;
    }

    try {
      setIsLoading(true);

      await api.register(normalizeForm(registerForm));

      window.location.reload();
    } catch (err) {
      notifyError(parseError(err), BOTTOM_CENTER);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form id="register-form" onSubmit={handleSubmit}>
      {/* AUTH FIELDS */}
      <Input
        type="text"
        name="first_name"
        placeholder="First Name"
        change={handleChange}
        animate
      />
      <Input
        type="text"
        name="last_name"
        placeholder="Last Name"
        change={handleChange}
        animate
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        change={handleChange}
        animate
        preventSpaces
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        change={handleChange}
        animate
        preventSpaces
      />

      {/* PROFILE FIELDS */}
      <Input
        type="date"
        name="birthdate"
        placeholder="Birthdate"
        change={handleChange}
        animate
      />

      <Input
        type="number"
        name="height_cm"
        placeholder="Height (cm)"
        change={handleChange}
        animate
      />

      <Input
        type="text"
        name="gender"
        placeholder="Gender"
        change={handleChange}
        animate
      />

      <Input
        type="text"
        name="interested_in"
        placeholder="Interested In"
        change={handleChange}
        animate
      />

      <Input
        type="text"
        name="bio"
        placeholder="Bio"
        change={handleChange}
        animate
      />

      <Button
        text="Create Account"
        id="register-button"
        click={handleSubmit}
        isPrimary
        isLoading={isLoading}
        disabled={isLoading}
      />
    </Form>
  );
};

export default Register;
