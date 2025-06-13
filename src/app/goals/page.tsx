"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoalCard from "@/components/goals/GoalCard";
import BottomNavigation from "@/components/BottomNavigation";
import dynamic from "next/dynamic";

// 클라이언트 컴포넌트를 동적으로 로드
const ChatBot = dynamic(() => import("@/components/chat/ChatBot"), {
  ssr: false,
});

// 목표 타입 정의
interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: Date | null;
  isCompleted: boolean;
  steps: { id: string; title: string; isCompleted: boolean }[];
}

// 초등학생들을 위한 목표 목록 페이지
export default function GoalsPage() {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "completed">("all");

  // 목표 목록 불러오기
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        // API 구현 전 임시 데이터
        const dummyData: Goal[] = [
          {
            id: "1",
            title: "수학 문제집 끝내기",
            description: "방학 숙제로 내준 수학 문제집을 모두 풀기",
            deadline: new Date(2025, 6, 20),
            isCompleted: false,
            steps: [
              { id: "step-1-1", title: "1-5단원 풀기", isCompleted: true },
              { id: "step-1-2", title: "6-10단원 풀기", isCompleted: false },
              { id: "step-1-3", title: "오답 정리하기", isCompleted: false },
            ],
          },
          {
            id: "2",
            title: "영어 단어 50개 외우기",
            description: "다음 영어 시험을 위해 새로운 단어 외우기",
            deadline: new Date(2025, 6, 15),
            isCompleted: false,
            steps: [
              { id: "step-2-1", title: "단어 카드 만들기", isCompleted: true },
              { id: "step-2-2", title: "매일 10개씩 외우기", isCompleted: true },
              { id: "step-2-3", title: "친구와 단어 시험보기", isCompleted: false },
            ],
          },
          {
            id: "3",
            title: "독서 감상문 쓰기",
            description: "방학 독서 과제로 내준 책을 읽고 감상문 쓰기",
            deadline: new Date(2025, 6, 25),
            isCompleted: true,
            steps: [
              { id: "step-3-1", title: "책 읽기", isCompleted: true },
              { id: "step-3-2", title: "중요한 내용 메모하기", isCompleted: true },
              { id: "step-3-3", title: "감상문 작성하기", isCompleted: true },
            ],
          },
        ];
        
        // 실제 API 연동 시 아래 코드 사용
        // const response = await fetch("/api/goals");
        // const data = await response.json();
        // setGoals(data);
        
        setGoals(dummyData);
      } catch (error) {
        console.error("목표 목록 불러오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  // 목표 완료 상태 토글 핸들러
  const handleToggleComplete = async (id: string, isCompleted: boolean) => {
    try {
      // 실제 API 연동 시 아래 코드 사용
      // await fetch(`/api/goals/${id}/toggle`, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ isCompleted }),
      // });
      
      // 임시 처리 - UI 상태 업데이트
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === id ? { ...goal, isCompleted } : goal
        )
      );
    } catch (error) {
      console.error("목표 상태 변경 오류:", error);
    }
  };

  // 목표 카드 클릭 핸들러
  const handleGoalClick = (id: string) => {
    router.push(`/goals/${id}`);
  };

  // 필터링된 목표 목록
  const filteredGoals = goals.filter((goal) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return !goal.isCompleted;
    if (activeFilter === "completed") return goal.isCompleted;
    return true;
  });

  // 목표 진행률 계산
  const calculateProgress = (goal: Goal) => {
    if (goal.steps.length === 0) return 0;
    const completedSteps = goal.steps.filter((step) => step.isCompleted).length;
    return Math.round((completedSteps / goal.steps.length) * 100);
  };

  return (
    <div className="flex flex-col pb-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">나의 학습 목표</h1>
        <Link 
          href="/goals/new" 
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          새 목표
        </Link>
      </div>

      {/* 필터 탭 */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeFilter === "all"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveFilter("all")}
        >
          전체 목표
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeFilter === "active"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveFilter("active")}
        >
          진행 중
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeFilter === "completed"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveFilter("completed")}
        >
          완료됨
        </button>
      </div>

      {isLoading ? (
        // 로딩 상태
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-xl w-full"></div>
          ))}
        </div>
      ) : filteredGoals.length > 0 ? (
        // 목표 목록
        <div className="space-y-4">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              id={goal.id}
              title={goal.title}
              description={goal.description}
              deadline={goal.deadline}
              isCompleted={goal.isCompleted}
              progress={calculateProgress(goal)}
              onClick={handleGoalClick}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      ) : (
        // 목표가 없는 경우
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">아직 목표가 없어요</h3>
          <p className="text-gray-600 mb-6">새로운 학습 목표를 만들어 볼까요?</p>
          <Link 
            href="/goals/new" 
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
          >
            첫 목표 만들기
          </Link>
        </div>
      )}
      
      {/* 하단 네비게이션 */}
      <BottomNavigation />
      
      {/* 챗봇 */}
      <ChatBot />
    </div>
  );
}
