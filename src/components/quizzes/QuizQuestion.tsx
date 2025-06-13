"use client";

import { useState } from 'react';

interface QuizQuestionProps {
  question: {
    id: string;
    content: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  onAnswer: (questionId: string, selectedIndex: number, isCorrect: boolean) => void;
  isAnswered: boolean;
  selectedIndex?: number;
}

// 퀴즈 질문 컴포넌트 - 개별 퀴즈 문제를 표시
export default function QuizQuestion({
  question,
  onAnswer,
  isAnswered,
  selectedIndex,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | undefined>(selectedIndex);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    
    setSelected(index);
    const isCorrect = index === question.correctIndex;
    onAnswer(question.id, index, isCorrect);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <h3 className="font-bold text-gray-800 mb-4">{question.content}</h3>
      
      <div className="space-y-3 mb-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={isAnswered}
            className={`w-full text-left p-3 rounded-lg border ${
              isAnswered
                ? index === question.correctIndex
                  ? 'bg-green-100 border-green-500'
                  : selected === index
                  ? 'bg-red-100 border-red-500'
                  : 'border-gray-200'
                : selected === index
                ? 'bg-blue-100 border-blue-500'
                : 'border-gray-200 hover:border-blue-300'
            } transition-colors`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                isAnswered
                  ? index === question.correctIndex
                    ? 'bg-green-500 text-white'
                    : selected === index
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200'
                  : selected === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>
      
      {isAnswered && (
        <div className={`p-3 rounded-lg ${
          selected === question.correctIndex ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <p className="font-medium mb-1">
            {selected === question.correctIndex ? '정답이에요! 👍' : '틀렸어요 😢'}
          </p>
          <p className="text-sm">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
