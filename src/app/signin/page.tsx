"use client";
import React, { useState } from "react";
import github from "../../../public/github.png";
import google from "../../../public/google.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (provider: string) => {
    setLoading(true);
    try {
      const result = await signIn(provider, { redirect: true,callbackUrl:"/" });
      if (!result) {
        setErrorMessage("An unexpected error occurred. Please try again.");
        router.push("/");
      } else if (result.error || !result.ok) {
        setErrorMessage(result.error || "An error occurred during sign-in.");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("Something went wrong during sign-in. Please try again.");
    }finally{
      setLoading(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full transform transition duration-300 hover:scale-105">
        {loading ? (<Loading/>) : errorMessage && (
          <div className="mb-4 text-red-600 text-center border border-red-600 bg-red-100 rounded-lg py-2 px-4">
            {errorMessage}
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Sign In</h1>
        <div className="space-y-4">
          <button
            onClick={() => handleLogin("google")}
            className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow-md hover:bg-gray-50 transition duration-200 w-full">
            <Image src={google} alt="Google" height={24} width={24} className="mr-3" />
            Sign in with Google
          </button>
          <button
            onClick={() => handleLogin("github")}
            className="flex items-center justify-center bg-white border border-gray-700 text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-50 transition duration-200 w-full">
            <Image src={github} alt="GitHub" height={24} width={24} className="mr-3" />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
