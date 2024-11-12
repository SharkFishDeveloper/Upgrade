"use client"
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black">
      
      {session.data ? (
        <div>
          Signed In 
          <button onClick={()=>signOut()}>Sign out</button>
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
