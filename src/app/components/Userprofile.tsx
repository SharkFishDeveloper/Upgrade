"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Update from "./Update";
import HeroSection from "./HeroSection";

const UserProfile = () => {
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="w-[80%] mx-auto p-8 bg-white text-black rounded-lg shadow-lg">
      {/* User Profile Header */}
      <h2 className="text-3xl font-semibold mb-8 text-center sm:text-left text-gray-800">
        Your Journey
      </h2>

      {/* Hero Section or Update Section */}
      {!update && <HeroSection />}

      <div className="space-y-6 mt-12 sm:mt-0 ">
        {/* Button Container */}
        <div className="flex justify-start space-x-4 mb-6">
          {/* Toggle Update View Button */}
          <button
            onClick={() => setUpdate(!update)}
            className="py-2 px-4 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 transition duration-300 ease-in-out">
            {update ? <p>Go Back</p> : <p>Edit Goals</p>}
          </button>

          {/* Sign Out Button */}
          <button
            onClick={() => setIsSignOutModalOpen(true)}
            className="py-2 px-4 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out">
            Sign Out
          </button>
        </div>

        {/* Update Section */}
        {update && <Update />}
      </div>

      {/* Sign Out Modal */}
      {isSignOutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Are you sure you want to sign out?
            </h3>
            <div className="flex justify-center space-x-6">
              <button
                onClick={handleSignOut}
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
                Yes, Sign Out
              </button>
              <button
                onClick={() => setIsSignOutModalOpen(false)}
                className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
