'use client';

import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import zxcvbn from 'zxcvbn';
import { AuthService } from '@/lib/auth';

const signUpSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const [message, setMessage] = React.useState('');

  // ✅ Watch password field value for strength calculation
  const password = useWatch({ control, name: 'password', defaultValue: '' });
  const strength = zxcvbn(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-blue-500', 'bg-green-500'];

  const onSubmit = async (data: SignUpData) => {
    setMessage('');
    try {
      const response = await AuthService.signup(data);
      setMessage('Account created successfully!');
      reset();
      console.log('Signup successful:', response);
    } catch (error) {
      setMessage('Signup failed: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Uwwp</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Firsgt Name</label>
            <input
              {...register('firstName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              {...register('lastName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}

            {/* ✅ Password Strength Meter */}
            {password && (
              <div className="mt-2">
                <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full ${strengthColors[strength.score]}`}
                    style={{ width: `${(strength.score + 1) * 20}%` }}
                  />
                </div>
                <p className="text-sm mt-1 text-gray-700">{strengthLabels[strength.score]}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-md ${
              message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
