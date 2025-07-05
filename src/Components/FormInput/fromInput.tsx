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
  type = 'text', 
  placeholder, 
  register, 
  error, 
  children 
}: FormInputProps) {
  return (
    <div>
      <input
        type={type}
        {...register}
        className="w-full text-gray-500  py-2 border-0 border-gray-500 border-b bg-transparent focus:outline-none focus:border-gray-500 "
        placeholder={placeholder}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {children}
    </div>
  );
}

