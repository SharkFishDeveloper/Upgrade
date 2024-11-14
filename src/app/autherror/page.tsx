"use client"

import { useRouter } from 'next/navigation';

const AuthError = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/signin'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold text-black mb-6">Sign-in Issue</h1>
        <p className="text-gray-700 mb-4">
          Something went wrong during sign-in. Make sure you&apos;re not already logged in. 
          Please try signing in with a different method.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-black text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-800 transition-colors">
          Go to Sign-in Page
        </button>
      </div>
    </div>
  );
};

export default AuthError;
