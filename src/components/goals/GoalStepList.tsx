"use client";

// 목표 단계 목록 컴포넌트 타입 정의
interface GoalStepListProps {
  steps: {
    id: string;
    title: string;
    isCompleted: boolean;
  }[];
  onToggleStep?: (id: string, isCompleted: boolean) => void;
  isEditable?: boolean;
}

// 초등학생들을 위한 목표 단계 목록 컴포넌트
export default function GoalStepList({
  steps,
  onToggleStep,
  isEditable = false,
}: GoalStepListProps) {
  // 단계 완료 상태 토글 핸들러
  const handleToggleStep = (id: string, currentStatus: boolean) => {
    if (onToggleStep) {
      onToggleStep(id, !currentStatus);
    }
  };

  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div 
          key={step.id} 
          className={`flex items-center p-3 rounded-lg ${
            step.isCompleted 
              ? "bg-green-50 border border-green-100" 
              : "bg-white border border-gray-100"
          }`}
        >
          {/* 체크박스 */}
          {isEditable && (
            <div 
              className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer mr-3 ${
                step.isCompleted ? "bg-green-500" : "border-2 border-gray-300"
              }`}
              onClick={() => handleToggleStep(step.id, step.isCompleted)}
            >
              {step.isCompleted && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          )}
          
          {/* 단계 번호 */}
          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
            step.isCompleted 
              ? "bg-green-200 text-green-800" 
              : "bg-blue-100 text-blue-800"
          }`}>
            {index + 1}
          </div>
          
          {/* 단계 제목 */}
          <span className={`${step.isCompleted ? "line-through text-green-700" : "text-gray-800"}`}>
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
}
