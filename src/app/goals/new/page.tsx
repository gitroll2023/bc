"use client";

import GoalForm from "@/components/goals/GoalForm";

// 새 목표 생성 페이지
export default function NewGoalPage() {
  return (
    <div className="flex flex-col pb-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">새 학습 목표 만들기</h1>
      <GoalForm />
    </div>
  );
}
