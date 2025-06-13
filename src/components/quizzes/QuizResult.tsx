"use client";

import Link from 'next/link';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

// 퀴즈 결과 컴포넌트 - 퀴즈 완료 후 결과 표시
export default function QuizResult({
  score,
  totalQuestions,
  onRetry,
}: QuizResultProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // 결과에 따른 메시지와 색상 결정
  const getMessage = () => {
    if (percentage >= 90) return { text: "훌륭해요! 메타인지 능력이 뛰어나네요!", color: "text-green-600" };
    if (percentage >= 70) return { text: "잘했어요! 조금만 더 노력하면 완벽할 거예요.", color: "text-blue-600" };
    if (percentage >= 50) return { text: "괜찮아요! 다음에는 더 잘할 수 있을 거예요.", color: "text-yellow-600" };
    return { text: "괜찮아요! 실수는 배움의 기회랍니다.", color: "text-orange-600" };
  };
  
  const { text, color } = getMessage();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
      <div className="mb-6">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center border-8 border-blue-100">
          <span className="text-3xl font-bold text-blue-600">{percentage}%</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {score}/{totalQuestions} 문제 정답
        </h2>
        <p className={`${color} font-medium`}>{text}</p>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={onRetry}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600"
        >
          다시 도전하기
        </button>
        <Link
          href="/quizzes"
          className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200"
        >
          다른 퀴즈 풀기
        </Link>
      </div>
      
      <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
        <h3 className="font-bold text-purple-800 mb-2">두뇌 코치의 생각</h3>
        <p className="text-sm text-purple-700">
          퀴즈를 풀면서 어떤 문제가 어려웠나요? 다음에 비슷한 문제를 만났을 때 
          어떻게 접근하면 좋을지 생각해보세요. 자신의 생각 과정을 이해하는 것이 
          메타인지의 첫 걸음이랍니다!
        </p>
      </div>
    </div>
  );
}
