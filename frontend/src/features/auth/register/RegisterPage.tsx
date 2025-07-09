// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { useRegisterStore } from './registerStore';
import { RegisterForm } from './RegisterForm';

export const RegisterPage = () => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const { loading, error, register } = useRegisterStore();

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