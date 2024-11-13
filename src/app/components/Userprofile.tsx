"use client"
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import ProfileDetails from "../backend/user_profile";

const UserProfile = () => {
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const session = useSession();
  const handleSignOut = () => {
    signOut()
  };


  const handleClick =async (id:string)=>{
    console.log("CONOSLE",await ProfileDetails({id}));

  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <div className="space-y-4">
        <button 
          onClick={()=> session.data?.user.id && handleClick(session.data?.user.id)}
          className="w-full py-2 px-4 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Edit Goals
        </button>
        
        <button
          onClick={() => setIsSignOutModalOpen(true)}
          className="w-full py-2 px-4 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
          Sign Out
        </button>
      </div>

      {/* Sign Out Modal */}
      {isSignOutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to sign out?</h3>
            <div className="space-x-4">
              <button
                onClick={handleSignOut}
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={() => setIsSignOutModalOpen(false)}
                className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
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
