"use client"
import Link from "next/link";

export const Appbar = () => {
 
  return (
    <div className="bg-white text-black py-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold">
          <Link href="/" className="text-lg font-semibold hover:text-gray-700 transition">
            Upgrade
          </Link>
        </h1>
        <div className="space-x-6">
          <Link href="/" className="text-sm font-semibold hover:text-gray-700 transition">
            Home
          </Link>
          <Link href="/about" className="text-sm font-semibold hover:text-gray-700 transition">
            About
          </Link>
          <Link href="/contact" className="text-sm font-semibold hover:text-gray-700 transition">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};
