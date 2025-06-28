'use client';

import React from 'react';
import { useForm, useWatch, UseFormRegisterReturn } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthService } from '@/lib/auth';
import { PasswordStrengthMeter } from '@/Components/PasswordStrengthMeter/passwordstrengthmeter';
import { useToast } from '@/Components/Toast/toast';
import { SubmitButton } from '@/Components/AuthSubmitButton/SubmitButton';
import { FormInput } from '@/Components/FormInput/fromInput';

// Zod validation schema
const LogInSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LogInData = z.infer<typeof LogInSchema>;

// Main LogIn Component
export default function LogInPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LogInData>({
    resolver: zodResolver(LogInSchema),
  });

  const { showSuccess, showError } = useToast();
    const router = useRouter();
  const password = useWatch({ control, name: 'password', defaultValue: '' });

  const onSubmit = async (data: LogInData) => {
    console.log('🎉 Form submitted!', data); // Debug log
    
    try {
      const response = await AuthService.login(data);
      console.log('✅ LogIn response:', response);

      showSuccess('Account created successfully!', {
        description: 'Welcome to our platform',
        action: {
          label: 'Get Started',
          onClick: () => {
           router.push('/products'); // Redirect to dashboard or home page
            console.log('Redirecting to dashboard...'); 
          }
        }
      });
      
       // ADD: Auto-redirect after 2 seconds
      setTimeout(() => {
        router.push('/products');
      }, 2000);

      reset();
    } catch (error) {
      console.error(' LogIn error:', error);
      
      showError('LogIn failed', {
        description: (error as Error).message || 'Something went wrong',
        action: {
          label: 'Try Again',

          onClick: () => {
            console.log('Retrying...');
          }
        }
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join us today and start your journey</p>
        </div>
       
        {/* LogIn Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              placeholder="John"
              register={register('firstName')}
              error={errors.firstName?.message}
            />
            <FormInput
              label="Last Name"
              placeholder="Doe"
              register={register('lastName')}
              error={errors.lastName?.message}
            />
          </div>

          {/* Email Field */}
          <FormInput
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            register={register('email')}
            error={errors.email?.message}
          />

          {/* Password Field with Strength Meter */}
          <FormInput
            label="Password"
            type="password"
            placeholder="Create a strong password"
            register={register('password')}
            error={errors.password?.message}
          >
            <PasswordStrengthMeter password={password} />
          </FormInput>

          {/* Submit Button */}
          <SubmitButton isSubmitting={isSubmitting} loadingText="Creating account...">
            Log In
          </SubmitButton>
        </form>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Create an account ?{' '}
            <a href="/auth/signUp" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}