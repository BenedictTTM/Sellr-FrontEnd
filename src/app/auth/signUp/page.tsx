'use client';

import React from 'react';
import { useForm, useWatch, UseFormRegisterReturn } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthService } from '@/lib/auth';
import { PasswordStrengthMeter } from '@/Components/PasswordStrengthMeter/passwordstrengthmeter';
import { useToast } from '@/Components/Toast/toast';
import { SubmitButton } from '@/Components/AuthSubmitButton/SubmitButton';
import { FormInput } from '@/Components/FormInput/fromInput';

// Zod validation schema
const signUpSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpData = z.infer<typeof signUpSchema>;

// Main SignUp Component
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

  const { showSuccess, showError } = useToast();
  const password = useWatch({ control, name: 'password', defaultValue: '' });

  const onSubmit = async (data: SignUpData) => {
    console.log('🎉 Form submitted!', data); // Debug log
    
    try {
      const response = await AuthService.signup(data);
      console.log('✅ Signup response:', response);

      showSuccess('Account created successfully!', {
        description: 'Welcome to our platform',
        action: {
          label: 'Get Started',
          onClick: () => {
            console.log('Redirecting to ...');
            // Redirect logic here, e.g., using router.push('/dashboard');
          }
        }
      });
      
      reset();
    } catch (error) {
      console.error(' Signup error:', error);
      
      showError('Signup failed', {
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
       
        {/* SignUp Form */}
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
            Create Account
          </SubmitButton>
        </form>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}