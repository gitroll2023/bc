"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

// 초등학생을 위한 환영 카드 컴포넌트
export default function WelcomeCard() {
  const { user, isLoaded } = useUser();
  const [greeting, setGreeting] = useState("");
  
  // 시간에 따른 인사말 설정
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("좋은 아침이에요!");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("안녕하세요!");
    } else {
      setGreeting("좋은 저녁이에요!");
    }
  }, []);

  if (!isLoaded) {
    return <div className="animate-pulse bg-gray-200 h-40 rounded-xl w-full"></div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16">
          {user ? (
            <Image
              src={user.imageUrl || "/images/default-avatar.png"}
              alt="프로필 이미지"
              fill
              className="rounded-full object-cover border-2 border-white"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold text-blue-800">
            {user ? `${user.firstName || "친구"}님, ${greeting}` : greeting}
          </h1>
          <p className="text-blue-600 mt-1">
            {user ? "오늘도 두뇌 코치와 함께해요!" : "두뇌 코치에 오신 것을 환영해요!"}
          </p>
        </div>
      </div>
    </div>
  );
}
