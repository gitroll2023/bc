"use client";

import { useState } from "react";

// 목표 카드 컴포넌트 타입 정의
interface GoalCardProps {
  id: string;
  title: string;
  description: string;
  deadline: Date | null;
  isCompleted: boolean;
  progress: number;
  onClick: (id: string) => void;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
}

// 초등학생들을 위한 목표 카드 컴포넌트
export default function GoalCard({
  id,
  title,
  description,
  deadline,
  isCompleted,
  progress,
  onClick,
  onToggleComplete,
}: GoalCardProps) {
  // 마우스 이벤트 상태 관리
  const [isHovered, setIsHovered] = useState(false);
  
  // 체크박스 클릭 핸들러
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete(id, !isCompleted);
  };
  
  // 카드 클릭 핸들러
  const handleCardClick = () => {
    onClick(id);
  };
  
  // 남은 날짜 계산
  const getDaysLeft = () => {
    if (!deadline) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "기한 지남";
    if (diffDays === 0) return "오늘까지";
    return `${diffDays}일 남음`;
  };
  
  // 남은 날짜에 따른 색상 설정
  const getDeadlineColor = () => {
    if (!deadline) return "text-gray-500";
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "text-red-500";
    if (diffDays <= 2) return "text-orange-500";
    return "text-blue-500";
  };

  return (
    <div 
      className={`bg-white rounded-xl p-4 shadow-sm border transition-all ${
        isCompleted ? "border-green-200 bg-green-50" : "border-gray-100"
      } ${isHovered ? "shadow-md" : ""}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          {/* 체크박스 */}
          <div 
            className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
              isCompleted ? "bg-green-500" : "border-2 border-gray-300"
            }`}
            onClick={handleCheckboxClick}
          >
            {isCompleted && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          {/* 제목 */}
          <h3 className={`font-bold ${isCompleted ? "text-green-700 line-through" : "text-gray-800"}`}>
            {title}
          </h3>
        </div>
        
        {/* 남은 날짜 */}
        {deadline && (
          <span className={`text-xs font-medium ${getDeadlineColor()}`}>
            {getDaysLeft()}
          </span>
        )}
      </div>
      
      {/* 설명 */}
      <p className={`text-sm ml-9 mb-3 ${isCompleted ? "text-green-600 line-through" : "text-gray-600"}`}>
        {description}
      </p>
      
      {/* 진행 상태 바 */}
      <div className="ml-9 mr-0 relative">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${isCompleted ? "bg-green-500" : "bg-blue-500"}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
