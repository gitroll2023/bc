"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuizCard from "@/components/quizzes/QuizCard";
import BottomNavigation from "@/components/BottomNavigation";
import dynamic from "next/dynamic";

// 클라이언트 컴포넌트를 동적으로 로드
const ChatBot = dynamic(() => import("@/components/chat/ChatBot"), {
  ssr: false,
});

// 퀴즈 타입 정의
interface Quiz {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  questionsCount: number;
}

// 초등학생들을 위한 퀴즈 목록 페이지
export default function QuizzesPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 퀴즈 목록 불러오기
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // API 구현 전 임시 데이터
        const dummyData: Quiz[] = [
          {
            id: "1",
            title: "메타인지 기초 퀴즈",
            description: "메타인지가 무엇인지 알아보는 기초 퀴즈입니다.",
            isCompleted: true,
            questionsCount: 5,
          },
          {
            id: "2",
            title: "학습 전략 퀴즈",
            description: "효과적인 학습 방법을 알아보는 퀴즈입니다.",
            isCompleted: false,
            questionsCount: 7,
          },
          {
            id: "3",
            title: "문제 해결 퀴즈",
            description: "문제를 해결하는 다양한 방법을 배워봅시다.",
            isCompleted: false,
            questionsCount: 6,
          },
        ];
        
        // 실제 API 연동 시 아래 코드 사용
        // const response = await fetch("/api/quizzes");
        // const data = await response.json();
        // setQuizzes(data);
        
        setQuizzes(dummyData);
      } catch (error) {
        console.error("퀴즈 목록 불러오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // 퀴즈 카드 클릭 핸들러
  const handleQuizClick = (id: string) => {
    router.push(`/quizzes/${id}`);
  };

  return (
    <div className="flex flex-col pb-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">메타인지 퀴즈</h1>
      
      {isLoading ? (
        // 로딩 상태
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-xl w-full"></div>
          ))}
        </div>
      ) : quizzes.length > 0 ? (
        // 퀴즈 목록
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              description={quiz.description}
              isCompleted={quiz.isCompleted}
              questionsCount={quiz.questionsCount}
              onClick={handleQuizClick}
            />
          ))}
        </div>
      ) : (
        // 퀴즈가 없는 경우
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-purple-100 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">아직 퀴즈가 없어요</h3>
          <p className="text-gray-600">곧 새로운 퀴즈가 추가될 예정이에요!</p>
        </div>
      )}
      
      {/* 하단 네비게이션 */}
      <BottomNavigation />
      
      {/* 챗봇 */}
      <ChatBot />
    </div>
  );
}
