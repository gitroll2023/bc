"use client";

interface ProfileStatsProps {
  stats: {
    journalsCount: number;
    completedGoals: number;
    quizScore: number;
  };
}

// 프로필 통계 컴포넌트 - 사용자의 활동 통계를 표시
export default function ProfileStats({ stats }: ProfileStatsProps) {
  const { journalsCount, completedGoals, quizScore } = stats;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-white rounded-xl p-3 text-center shadow-sm">
        <div className="text-2xl font-bold text-blue-500 mb-1">{journalsCount}</div>
        <div className="text-xs text-gray-600">작성한 일기</div>
      </div>
      
      <div className="bg-white rounded-xl p-3 text-center shadow-sm">
        <div className="text-2xl font-bold text-green-500 mb-1">{completedGoals}</div>
        <div className="text-xs text-gray-600">달성한 목표</div>
      </div>
      
      <div className="bg-white rounded-xl p-3 text-center shadow-sm">
        <div className="text-2xl font-bold text-purple-500 mb-1">{quizScore}%</div>
        <div className="text-xs text-gray-600">평균 퀴즈 점수</div>
      </div>
    </div>
  );
}
