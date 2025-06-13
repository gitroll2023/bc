"use client";

import { useState, useEffect } from "react";

// 초등학생들을 위한 메타인지 팁 배열
const tips = [
  {
    title: "생각 돌아보기",
    content: "공부를 마치고 나서 '오늘 무엇을 배웠지?'라고 스스로에게 물어보세요.",
    emoji: "🤔",
  },
  {
    title: "목표 세우기",
    content: "공부를 시작하기 전에 '오늘은 무엇을 배우고 싶어?'라고 생각해 보세요.",
    emoji: "🎯",
  },
  {
    title: "어려운 문제는?",
    content: "어려운 문제가 있다면 '어떻게 풀 수 있을까?'라고 다양한 방법을 생각해 보세요.",
    emoji: "💡",
  },
  {
    title: "실수에서 배우기",
    content: "실수를 했다면 '왜 틀렸을까?'라고 생각하고 다음에는 어떻게 할지 계획해 보세요.",
    emoji: "✏️",
  },
  {
    title: "나만의 방법 찾기",
    content: "나에게 가장 잘 맞는 공부 방법이 무엇인지 생각해 보세요.",
    emoji: "🔍",
  },
];

// 초등학생들을 위한 팁 카드 컴포넌트
export default function TipCard() {
  const [currentTip, setCurrentTip] = useState(0);
  
  // 일정 시간마다 팁 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 10000); // 10초마다 변경
    
    return () => clearInterval(interval);
  }, []);
  
  const tip = tips[currentTip];
  
  return (
    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{tip.emoji}</span>
        <h3 className="font-bold text-yellow-800">오늘의 두뇌 팁</h3>
      </div>
      
      <h4 className="font-medium text-yellow-700 mb-1">{tip.title}</h4>
      <p className="text-sm text-yellow-700">{tip.content}</p>
      
      <div className="flex justify-center mt-3">
        {tips.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === currentTip ? "bg-yellow-500" : "bg-yellow-200"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
