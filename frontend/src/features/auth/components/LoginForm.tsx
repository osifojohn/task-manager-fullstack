'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/lib/constants';

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  const { login, isLoggingIn } = useAuth();

  const testAccount = {
    email: 'sarah.johnson@email.com',
    password: 'password123',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(formData);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleCopyCredential = async (
    text: string,
    type: 'email' | 'password'
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessage(`${type === 'email' ? 'Email' : 'Password'} copied!`);
      setTimeout(() => setCopiedMessage(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopiedMessage('Failed to copy!');
      setTimeout(() => setCopiedMessage(null), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Friendly Render Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-3 rounded text-sm">
          💡 <span className="font-medium">Please note:</span> I hosted the
          backend on Render, so it might take a few seconds to wake up when you
          first sign in. Thanks for your patience!
        </div>

        <div>
          <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">
            Sign in to TaskFlow
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href={ROUTES.AUTH.SIGNUP}
              className="text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* Test Account Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h3 className="text-sm font-medium text-blue-900">🧪 Test Account</h3>
          <div className="flex items-center gap-4 mt-1">
            <button
              type="button"
              onClick={() => handleCopyCredential(testAccount.email, 'email')}
              className="text-xs cursor-pointer text-blue-700 hover:text-blue-900 font-mono bg-white px-2 py-1 rounded border"
            >
              {testAccount.email}
            </button>
            <button
              type="button"
              onClick={() =>
                handleCopyCredential(testAccount.password, 'password')
              }
              className="text-xs cursor-pointer text-blue-700 hover:text-blue-900 font-mono bg-white px-2 py-1 rounded border"
            >
              {testAccount.password}
            </button>
          </div>
          {copiedMessage && (
            <p className="text-xs text-green-600 mt-2 mx-auto  flex justify-center">
              {copiedMessage}
            </p>
          )}
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              placeholder="Enter your email"
              required
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={errors.password}
              placeholder="Enter your password"
              required
            />
            <Button type="submit" className="w-full" loading={isLoggingIn}>
              Sign in
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
