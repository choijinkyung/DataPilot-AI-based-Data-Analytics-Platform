// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { useAuthStore } from '@features/register/authStore';
import { RegisterForm } from '@features/register/components/RegisterForm';

export const RegisterPage = () => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const { loading, error, register } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <RegisterForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};