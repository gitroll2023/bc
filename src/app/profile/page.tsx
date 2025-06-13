"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileAchievements from "@/components/profile/ProfileAchievements";
import BottomNavigation from "@/components/BottomNavigation";
import dynamic from "next/dynamic";

// 클라이언트 컴포넌트를 동적으로 로드
const ChatBot = dynamic(() => import("@/components/chat/ChatBot"), {
  ssr: false,
});

// 초등학생들을 위한 프로필 페이지
export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "김두뇌",
    grade: "4학년",
    avatarUrl: "/images/avatar-placeholder.png",
  });
  
  const [stats, setStats] = useState({
    journalsCount: 7,
    completedGoals: 3,
    quizScore: 85,
  });
  
  const [achievements, setAchievements] = useState([
    {
      id: "1",
      title: "일기 작가",
      description: "첫 번째 일기 작성하기",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      ),
      isUnlocked: true,
    },
    {
      id: "2",
      title: "목표 달성가",
      description: "첫 번째 목표 완료하기",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      isUnlocked: true,
    },
    {
      id: "3",
      title: "퀴즈 마스터",
      description: "퀴즈에서 100점 받기",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      ),
      isUnlocked: false,
    },
    {
      id: "4",
      title: "꾸준한 학습자",
      description: "7일 연속 접속하기",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      isUnlocked: true,
    },
    {
      id: "5",
      title: "메타인지 전문가",
      description: "모든 퀴즈 완료하기",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      ),
      isUnlocked: false,
    },
  ]);
  
  // 사용자 데이터 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // API 구현 전 임시 데이터 사용 중
        // 실제 API 연동 시 아래 코드 사용
        // const response = await fetch("/api/users/me");
        // const data = await response.json();
        // setUser(data.user);
        // setStats(data.stats);
        // setAchievements(data.achievements);
      } catch (error) {
        console.error("사용자 정보 불러오기 오류:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col pb-16">
      {/* 프로필 헤더 */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6 text-center">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 relative">
          {/* 실제 이미지가 없으므로 임시 아바타 표시 */}
          <svg
            className="absolute inset-0 w-full h-full text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        
        <h1 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h1>
        <p className="text-gray-600">{user.grade}</p>
      </div>
      
      {/* 통계 */}
      <ProfileStats stats={stats} />
      
      {/* 업적 */}
      <ProfileAchievements achievements={achievements} />
      
      {/* 설정 버튼 */}
      <div className="space-y-3">
        <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          설정
        </button>
        
        <button className="w-full bg-red-100 text-red-600 py-3 px-4 rounded-md hover:bg-red-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          로그아웃
        </button>
      </div>
      
      {/* 하단 네비게이션 */}
      <BottomNavigation />
      
      {/* 챗봇 */}
      <ChatBot />
    </div>
  );
}
