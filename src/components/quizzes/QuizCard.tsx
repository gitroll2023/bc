"use client";

import { useState } from 'react';

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  questionsCount: number;
  onClick: (id: string) => void;
}

// 퀴즈 카드 컴포넌트 - 퀴즈 목록에서 각 퀴즈를 표시
export default function QuizCard({
  id,
  title,
  description,
  isCompleted,
  questionsCount,
  onClick,
}: QuizCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-4 border-l-4 ${
        isCompleted ? 'border-green-500' : 'border-purple-500'
      } cursor-pointer hover:shadow-md transition-shadow`}
      onClick={() => onClick(id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-800">{title}</h3>
        {isCompleted && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            완료
          </span>
        )}
      </div>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>문제 {questionsCount}개</span>
        {!isCompleted && <span className="text-purple-600 font-medium">도전하기</span>}
      </div>
    </div>
  );
}
