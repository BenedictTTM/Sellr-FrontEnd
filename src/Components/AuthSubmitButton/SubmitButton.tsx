import React from 'react';
import Image from 'next/image';
import GoogleIcon from '../../../public/GoogleIcon.svg';

interface SubmitButtonProps {
  isSubmitting: boolean;
  children: React.ReactNode;
  loadingText?: string;
}

export function SubmitButton({ isSubmitting, children, loadingText = 'Loading...' }: SubmitButtonProps) {
  return (
    <>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 text-white py-2 px-4 rounded-sm hover:bg-red-700 disabled:opacity-50"
      >
        {isSubmitting ? loadingText : children}
      </button>
      <button 
        type="button"
        disabled={isSubmitting}
        className="w-full text-gray-600 py-2 px-4 border border-gray-500 rounded-sm disabled:opacity-50 hover:bg-gray-50"
      >
        <Image src={GoogleIcon} alt="Google Icon" className="inline-block mr-2" width={17} height={17} />
        Sign up with Google
      </button>
    </>
  );
}

