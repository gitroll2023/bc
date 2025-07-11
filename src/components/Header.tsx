"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="py-4 px-4 mb-4">
      <Link href="/" className="inline-block">
        <div className="flex items-center">
          <div className="bg-blue-500 text-white rounded-lg p-2 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Brain Coach</h1>
        </div>
      </Link>
    </header>
  );
}
