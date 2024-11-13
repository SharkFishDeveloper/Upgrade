"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Userprofile from "./components/Userprofile";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  useEffect(()=>{
    if(session.data && session.data.user){
      localStorage.setItem("user",JSON.stringify(session.data.user))
    }
  },[session.data])
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black">
      
      {session.data ? (
        <div>
          <Userprofile/>
        </div>
      ) : (
        <div className="text-center space-y-6 p-8 border border-gray-700 rounded-md max-w-md bg-gray-800">
          <h1 className="text-4xl font-bold text-white">Upgrade</h1>
          <p className="text-lg  text-gray-400 font-semibold">A solo leveling journey awaits</p>
          <div className="space-x-4">
            <button
              className="px-6 py-3 font-semibold border border-white rounded-lg hover:bg-white hover:text-black transition-all text-white"
              onClick={() => signIn()}
            >
              <Link href={"/signin"}>Start your journey</Link>
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}
