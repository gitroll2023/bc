"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 목표 폼 컴포넌트 타입 정의
interface GoalFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    deadline: string | null;
    steps: { id: string; title: string; isCompleted: boolean }[];
  };
  isEditing?: boolean;
}

// 초등학생들을 위한 목표 생성/수정 폼 컴포넌트
export default function GoalForm({ initialData, isEditing = false }: GoalFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 기본 폼 데이터 설정
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    deadline: initialData?.deadline || "",
    steps: initialData?.steps || [
      { id: "step-1", title: "", isCompleted: false },
    ],
  });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 단계 추가 핸들러
  const handleAddStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        { id: `step-${Date.now()}`, title: "", isCompleted: false },
      ],
    }));
  };

  // 단계 삭제 핸들러
  const handleRemoveStep = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.filter((step) => step.id !== id),
    }));
  };

  // 단계 변경 핸들러
  const handleStepChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === id ? { ...step, title: value } : step
      ),
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      alert("목표 제목을 입력해주세요!");
      return;
    }
    
    // 빈 단계 필터링
    const filteredSteps = formData.steps.filter((step) => step.title.trim() !== "");
    
    if (filteredSteps.length === 0) {
      alert("최소한 하나의 단계를 입력해주세요!");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const dataToSubmit = {
        ...formData,
        steps: filteredSteps,
      };
      
      const url = isEditing && initialData?.id 
        ? `/api/goals/${initialData.id}` 
        : "/api/goals";
      
      const method = isEditing ? "PUT" : "POST";
      
      // 실제 API 연동 시 아래 코드 사용
      // const response = await fetch(url, {
      //   method,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(dataToSubmit),
      // });
      
      // if (!response.ok) {
      //   throw new Error("목표 저장에 실패했어요");
      // }
      
      // 임시 처리
      console.log("목표 데이터:", dataToSubmit);
      
      // 성공 시 목표 목록 페이지로 이동
      setTimeout(() => {
        router.push("/goals");
        router.refresh();
      }, 500);
    } catch (error) {
      console.error("목표 저장 오류:", error);
      alert("목표를 저장하는 중에 문제가 생겼어요. 다시 시도해 볼까요?");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* 제목 입력 */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          목표 제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="내가 이루고 싶은 목표는?"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={50}
        />
      </div>
      
      {/* 설명 입력 */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          목표 설명
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="이 목표를 왜 이루고 싶나요? 어떻게 도움이 될까요?"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
      
      {/* 마감일 입력 */}
      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
          목표 마감일 (선택사항)
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* 단계 입력 */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            목표 달성 단계
          </label>
          <button
            type="button"
            onClick={handleAddStep}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            단계 추가
          </button>
        </div>
        
        <div className="space-y-2">
          {formData.steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <input
                type="text"
                value={step.title}
                onChange={(e) => handleStepChange(step.id, e.target.value)}
                placeholder={`${index + 1}번째 단계`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveStep(step.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* 메타인지 팁 */}
      <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100 mt-2">
        <h4 className="text-sm font-medium text-yellow-800 mb-2">
          목표 설정 팁
        </h4>
        <ul className="list-disc pl-5 text-xs text-yellow-700 space-y-1">
          <li>목표는 구체적으로 정하면 더 잘 이룰 수 있어요.</li>
          <li>작은 단계로 나누면 차근차근 달성할 수 있어요.</li>
          <li>목표를 달성한 후 어떤 기분일지 상상해보세요!</li>
          <li>목표를 이루기 위해 필요한 도움이 있다면 적어보세요.</li>
        </ul>
      </div>
      
      {/* 버튼 그룹 */}
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? "저장 중..." : isEditing ? "수정하기" : "저장하기"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          취소
        </button>
      </div>
    </form>
  );
}
