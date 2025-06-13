import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import BottomNavigation from "../components/BottomNavigation";
import Link from "next/link";
import dynamic from "next/dynamic";

// 클라이언트 컴포넌트를 동적으로 로드
const ChatBot = dynamic(() => import("../components/chat/ChatBot"), {
  ssr: false,
});

// 아이들이 읽기 쉽고 좋아하는 폰트를 사용합니다
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brain Coach - 초등학생을 위한 메타인지 앱",
  description: "초등학생들이 자신의 학습 과정을 이해하고 개선할 수 있도록 도와주는 메타인지 웹앱",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ko">
        <body className={`${inter.variable} font-sans antialiased`}>
          <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white">
            <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <div className="bg-blue-500 text-white rounded-lg p-1.5 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h1 className="text-xl font-bold text-blue-600">
                    Brain Coach
                  </h1>
                </div>
              </Link>
              <div>
                <SignedOut>
                  <div className="flex gap-2">
                    <SignInButton>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        로그인
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                        회원가입
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </header>
            
            <main className="flex-grow p-4">
              {children}
            </main>
            
            <SignedIn>
              <BottomNavigation />
              <ChatBot />
            </SignedIn>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
