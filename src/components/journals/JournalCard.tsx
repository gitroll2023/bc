"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

// 일기 카드 컴포넌트 타입 정의
interface JournalCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  mood: string;
  onClick: (id: string) => void;
}

// 초등학생들을 위한 일기 카드 컴포넌트
export default function JournalCard({
  id,
  title,
  content,
  createdAt,
  mood,
  onClick,
}: JournalCardProps) {
  // 감정에 따른 이모지 매핑
  const moodEmoji = {
    happy: "😊",
    sad: "😢",
    excited: "🤩",
    confused: "🤔",
    proud: "😎",
    default: "📝",
  };

  // 내용 미리보기 (50자)
  const previewContent = content.length > 50 
    ? `${content.substring(0, 50)}...` 
    : content;
  
  // 시간 형식 변환 (예: '3시간 전')
  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer transition-transform hover:scale-[1.01]"
      onClick={() => onClick(id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-800">{title}</h3>
        <span className="text-2xl" role="img" aria-label={mood}>
          {moodEmoji[mood as keyof typeof moodEmoji] || moodEmoji.default}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{previewContent}</p>
      
      <div className="text-xs text-gray-500">{timeAgo}</div>
    </div>
  );
}
