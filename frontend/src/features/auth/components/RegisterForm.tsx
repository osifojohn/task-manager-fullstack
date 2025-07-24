'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/lib/constants';

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, isRegistering } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    register({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Friendly Render Notice */}
        <div className="bg-yellow-50 border-l-4 mb-4 border-yellow-400 text-yellow-800 p-3 rounded text-sm">
          💡 <span className="font-medium">Please note:</span> I hosted the
          backend on Render, so it might take a few seconds to wake up when you
          first create an account. Thanks for your patience!
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href={ROUTES.AUTH.LOGIN}
              className="text-blue-600 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <Card className="p-8 shadow-lg rounded-2xl border border-gray-200 bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              placeholder="John Doe"
              required
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              placeholder="you@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={errors.password}
              placeholder="••••••••"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              placeholder="••••••••"
              required
            />

            <Button
              type="submit"
              className="w-full rounded-xl py-2 text-base font-semibold"
              loading={isRegistering}
            >
              Sign Up
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
