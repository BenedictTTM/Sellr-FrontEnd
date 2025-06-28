import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label: string;
  type?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  children?: React.ReactNode;
}

export function FormInput({ 
  label, 
  type = 'text', 
  placeholder, 
  register, 
  error, 
  children 
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        {...register}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder={placeholder}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {children}
    </div>
  );
}

