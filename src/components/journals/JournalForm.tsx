"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 일기 폼 컴포넌트 타입 정의
interface JournalFormProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    mood: string;
  };
  isEditing?: boolean;
}

// 초등학생들을 위한 일기 작성 폼 컴포넌트
export default function JournalForm({ initialData, isEditing = false }: JournalFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    mood: initialData?.mood || "happy",
  });

  // 감정 옵션
  const moodOptions = [
    { value: "happy", label: "기쁨", emoji: "😊" },
    { value: "sad", label: "슬픔", emoji: "😢" },
    { value: "excited", label: "신남", emoji: "🤩" },
    { value: "confused", label: "혼란", emoji: "🤔" },
    { value: "proud", label: "뿌듯", emoji: "😎" },
  ];

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const url = isEditing && initialData?.id 
        ? `/api/journals/${initialData.id}` 
        : "/api/journals";
      
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("일기 저장에 실패했어요");
      }
      
      router.push("/journals");
      router.refresh();
    } catch (error) {
      console.error("일기 저장 오류:", error);
      alert("일기를 저장하는 중에 문제가 생겼어요. 다시 시도해 볼까요?");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    router.back();
  };

  // 메타인지 질문 가이드
  const metacognitionGuides = [
    "오늘 배운 것 중에서 가장 중요한 것은 무엇이었나요?",
    "어떤 부분이 어려웠나요? 어떻게 해결했나요?",
    "다음에는 어떻게 더 잘할 수 있을까요?",
    "오늘 배운 것을 어디에 활용할 수 있을까요?",
    "내가 잘한 점은 무엇인가요?",
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* 제목 입력 */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="오늘의 일기 제목을 적어보세요"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={50}
        />
      </div>
      
      {/* 감정 선택 */}
      <div>
        <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-1">
          오늘의 기분
        </label>
        <div className="grid grid-cols-5 gap-2">
          {moodOptions.map((option) => (
            <label
              key={option.value}
              className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${
                formData.mood === option.value
                  ? "bg-blue-100 border-2 border-blue-500"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="mood"
                value={option.value}
                checked={formData.mood === option.value}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-2xl mb-1">{option.emoji}</span>
              <span className="text-xs">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* 내용 입력 */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="오늘 배운 것과 느낀 점을 적어보세요"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={8}
        />
      </div>
      
      {/* 메타인지 가이드 */}
      <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100">
        <h4 className="text-sm font-medium text-yellow-800 mb-2">
          생각해볼 질문들
        </h4>
        <ul className="list-disc pl-5 text-xs text-yellow-700 space-y-1">
          {metacognitionGuides.map((guide, index) => (
            <li key={index}>{guide}</li>
          ))}
        </ul>
      </div>
      
      {/* 버튼 그룹 */}
      <div className="flex gap-3 mt-2">
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
