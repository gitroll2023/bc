"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoalStepList from "@/components/goals/GoalStepList";
import BottomNavigation from "@/components/BottomNavigation";
import dynamic from "next/dynamic";

// 클라이언트 컴포넌트를 동적으로 로드
const ChatBot = dynamic(() => import("@/components/chat/ChatBot"), {
  ssr: false,
});

// 목표 상세 페이지 props 타입 정의
interface GoalDetailPageProps {
  params: {
    id: string;
  };
}

// 목표 타입 정의
interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: Date | null;
  isCompleted: boolean;
  steps: { id: string; title: string; isCompleted: boolean }[];
  createdAt: Date;
}

// 초등학생들을 위한 목표 상세 페이지
export default function GoalDetailPage({ params }: GoalDetailPageProps) {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = params;

  // 목표 데이터 불러오기
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        // API 구현 전 임시 데이터
        const dummyData: Record<string, Goal> = {
          "1": {
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
            createdAt: new Date(2025, 5, 1),
          },
          "2": {
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
            createdAt: new Date(2025, 5, 5),
          },
          "3": {
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
            createdAt: new Date(2025, 5, 10),
          },
        };
        
        // 실제 API 연동 시 아래 코드 사용
        // const response = await fetch(`/api/goals/${id}`);
        // const data = await response.json();
        // setGoal(data);
        
        // 임시 데이터에서 ID로 목표 찾기
        const foundGoal = dummyData[id];
        if (foundGoal) {
          setGoal(foundGoal);
        } else {
          router.push("/goals");
        }
      } catch (error) {
        console.error("목표 상세 정보 불러오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoal();
  }, [id, router]);

  // 단계 완료 상태 토글 핸들러
  const handleToggleStep = async (stepId: string, isCompleted: boolean) => {
    if (!goal) return;
    
    try {
      // 실제 API 연동 시 아래 코드 사용
      // await fetch(`/api/goals/${id}/steps/${stepId}`, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ isCompleted }),
      // });
      
      // 임시 처리 - UI 상태 업데이트
      const updatedSteps = goal.steps.map((step) =>
        step.id === stepId ? { ...step, isCompleted } : step
      );
      
      // 모든 단계가 완료되었는지 확인
      const allStepsCompleted = updatedSteps.every((step) => step.isCompleted);
      
      setGoal({
        ...goal,
        steps: updatedSteps,
        isCompleted: allStepsCompleted,
      });
    } catch (error) {
      console.error("단계 상태 변경 오류:", error);
    }
  };

  // 목표 삭제 핸들러
  const handleDelete = async () => {
    if (!confirm("정말로 이 목표를 삭제할까요?")) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      // 실제 API 연동 시 아래 코드 사용
      // await fetch(`/api/goals/${id}`, {
      //   method: "DELETE",
      // });
      
      // 임시 처리
      setTimeout(() => {
        router.push("/goals");
        router.refresh();
      }, 500);
    } catch (error) {
      console.error("목표 삭제 오류:", error);
      alert("목표를 삭제하는 중에 문제가 생겼어요. 다시 시도해 볼까요?");
      setIsDeleting(false);
    }
  };

  // 남은 날짜 계산
  const getDaysLeft = () => {
    if (!goal?.deadline) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deadlineDate = new Date(goal.deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "기한이 지났어요";
    if (diffDays === 0) return "오늘까지예요";
    return `${diffDays}일 남았어요`;
  };

  // 진행률 계산
  const calculateProgress = () => {
    if (!goal || goal.steps.length === 0) return 0;
    const completedSteps = goal.steps.filter((step) => step.isCompleted).length;
    return Math.round((completedSteps / goal.steps.length) * 100);
  };

  // 로딩 중 UI
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pb-20">
        {/* 뒤로가기 버튼 */}
        <div className="flex items-center mb-2">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-blue-500 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            뒤로가기
          </button>
        </div>
        <div className="animate-pulse bg-gray-200 h-8 w-3/4 rounded-md"></div>
        <div className="animate-pulse bg-gray-200 h-4 w-1/4 rounded-md mb-4"></div>
        <div className="animate-pulse bg-gray-200 h-32 w-full rounded-md"></div>
        <BottomNavigation />
        <ChatBot />
      </div>
    );
  }

  // 목표가 없는 경우
  if (!goal) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-full flex items-center mb-4 px-4">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-blue-500 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            뒤로가기
          </button>
        </div>
        <div className="bg-red-100 text-red-500 p-4 rounded-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-bold">목표를 찾을 수 없어요</h3>
        </div>
        <p className="text-gray-600 mb-6">찾으시는 목표가 없거나 삭제되었을 수 있어요.</p>
        <Link href="/goals" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          목표 목록으로 돌아가기
        </Link>
        <BottomNavigation />
        <ChatBot />
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-20">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-2">
        <h1 className="text-2xl font-bold text-gray-800">{goal.title}</h1>
        {goal.isCompleted && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            완료됨
          </span>
        )}
      </div>
      
      {/* 설명 */}
      <p className="text-gray-600 mb-6">{goal.description}</p>
      
      {/* 진행 상황 */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-700">진행 상황</h3>
          <span className="text-sm font-bold">{calculateProgress()}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full ${goal.isCompleted ? "bg-green-500" : "bg-blue-500"}`} 
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        
        {/* 마감일 */}
        {goal.deadline && (
          <div className="text-sm text-right">
            <span className={`font-medium ${
              new Date(goal.deadline) < new Date() ? "text-red-500" : "text-blue-500"
            }`}>
              {getDaysLeft()}
            </span>
          </div>
        )}
      </div>
      
      {/* 단계 목록 */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-700 mb-3">목표 달성 단계</h3>
        <GoalStepList 
          steps={goal.steps} 
          onToggleStep={handleToggleStep}
          isEditable={!goal.isCompleted}
        />
      </div>
      
      {/* 메타인지 팁 */}
      <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <h3 className="font-bold text-purple-800">두뇌 코치의 생각</h3>
        </div>
        <p className="text-sm text-purple-700">
          {goal.isCompleted ? (
            "목표를 달성했군요! 어떤 방법이 가장 효과적이었는지, 다음에는 어떻게 하면 더 잘할 수 있을지 생각해보세요."
          ) : calculateProgress() > 50 ? (
            "목표를 향해 잘 나아가고 있어요! 지금까지 어떤 방법이 도움이 되었나요? 남은 단계를 완료하기 위한 계획을 세워보세요."
          ) : (
            "목표를 작은 단계로 나누어 하나씩 완료해보세요. 어떤 부분이 어렵다면 도움을 요청하는 것도 좋은 방법이에요."
          )}
        </p>
      </div>
      
      {/* 버튼 그룹 */}
      <div className="flex gap-3">
        <Link 
          href={`/goals/edit/${goal.id}`}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-600"
        >
          수정하기
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 bg-red-100 text-red-600 py-2 px-4 rounded-md hover:bg-red-200 disabled:opacity-50"
        >
          {isDeleting ? "삭제 중..." : "삭제하기"}
        </button>
      </div>
      
      {/* 하단 네비게이션 */}
      <BottomNavigation />
      
      {/* 챗봇 */}
      <ChatBot />
    </div>
  );
}
