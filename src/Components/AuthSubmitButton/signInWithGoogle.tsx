import React from 'react'
import Image from 'next/image';
import GoogleIcon from '../../../public/GoogleIcon.svg';

interface SubmitButtonProps {
  isSubmitting: boolean;
  loadingText?: string;
}

const signInWithGoogle = ({isSubmitting}:SubmitButtonProps) => {
  return (
    <>
        <button 
        type="button"
        disabled={isSubmitting}
        className="w-full text-gray-600 py-2 px-4 border border-gray-300 rounded-sm disabled:opacity-50 hover:bg-gray-50"
      >
        <Image src={GoogleIcon} alt="Google Icon" className="inline-block mr-2" width={17} height={17} />
        Sign up with Google
      </button>
    </>
  )
}

export default signInWithGoogle