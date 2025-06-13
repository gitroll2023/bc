"use client";

// 진행 상황 카드 컴포넌트 타입 정의
interface ProgressCardProps {
  title: string;
  value: number;
  maxValue: number;
  color: string;
}

// 초등학생들을 위한 진행 상황 카드 컴포넌트
export default function ProgressCard({
  title,
  value,
  maxValue,
  color,
}: ProgressCardProps) {
  // 진행률 계산
  const percentage = Math.round((value / maxValue) * 100);
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <span className="text-sm font-bold">{percentage}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full ${color}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500 text-right">
        {value}/{maxValue}
      </div>
    </div>
  );
}
