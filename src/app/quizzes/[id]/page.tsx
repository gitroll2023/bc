"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import QuizQuestion from "@/components/quizzes/QuizQuestion";
import QuizResult from "@/components/quizzes/QuizResult";
import BottomNavigation from "@/components/BottomNavigation";
import dynamic from "next/dynamic";

// 클라이언트 컴포넌트를 동적으로 로드
const ChatBot = dynamic(() => import("@/components/chat/ChatBot"), {
  ssr: false,
});

// 퀴즈 상세 페이지 props 타입 정의
interface QuizDetailPageProps {
  params: {
    id: string;
  };
}

// 퀴즈 타입 정의
interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: {
    id: string;
    content: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

// 초등학생들을 위한 퀴즈 상세 페이지
export default function QuizDetailPage({ params }: QuizDetailPageProps) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; selectedIndex: number; isCorrect: boolean }[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { id } = params;

  // 퀴즈 데이터 불러오기
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // API 구현 전 임시 데이터
        const dummyData: Record<string, Quiz> = {
          "1": {
            id: "1",
            title: "메타인지 기초 퀴즈",
            description: "메타인지가 무엇인지 알아보는 기초 퀴즈입니다.",
            questions: [
              {
                id: "q1-1",
                content: "메타인지란 무엇인가요?",
                options: [
                  "빠르게 공부하는 방법",
                  "자신의 생각과 학습 과정을 이해하고 조절하는 능력",
                  "수학 문제를 푸는 특별한 방법",
                  "컴퓨터를 사용한 학습법"
                ],
                correctIndex: 1,
                explanation: "메타인지는 '생각에 대한 생각'으로, 자신의 학습 과정을 인식하고 조절하는 능력을 말해요."
              },
              {
                id: "q1-2",
                content: "다음 중 메타인지 활동이 아닌 것은?",
                options: [
                  "공부하기 전에 계획 세우기",
                  "문제를 풀면서 자신의 이해도 확인하기",
                  "친구와 게임하기",
                  "공부한 후 무엇을 배웠는지 정리하기"
                ],
                correctIndex: 2,
                explanation: "친구와 게임하는 것은 재미있는 활동이지만, 메타인지 활동은 아니에요."
              },
              {
                id: "q1-3",
                content: "공부할 때 어려운 부분을 만났을 때 가장 좋은 방법은?",
                options: [
                  "포기하고 다른 것을 공부하기",
                  "왜 어려운지 생각해보고 도움을 요청하기",
                  "그냥 외우기",
                  "쉬운 부분만 공부하기"
                ],
                correctIndex: 1,
                explanation: "어려운 부분을 만났을 때는 왜 어려운지 생각해보고, 필요하다면 선생님이나 친구에게 도움을 요청하는 것이 좋아요."
              },
              {
                id: "q1-4",
                content: "다음 중 좋은 학습 습관은?",
                options: [
                  "밤늦게까지 한 번에 많이 공부하기",
                  "공부하면서 동시에 여러 가지 일하기",
                  "규칙적으로 짧게 여러 번 공부하기",
                  "시험 전날에만 공부하기"
                ],
                correctIndex: 2,
                explanation: "규칙적으로 짧게 여러 번 공부하는 것이 한 번에 오래 공부하는 것보다 효과적이에요."
              },
              {
                id: "q1-5",
                content: "공부한 내용을 더 잘 기억하는 방법은?",
                options: [
                  "계속 반복해서 읽기",
                  "다른 사람에게 설명해보기",
                  "그냥 듣기만 하기",
                  "빠르게 훑어보기"
                ],
                correctIndex: 1,
                explanation: "배운 내용을 다른 사람에게 설명해보면 자신이 얼마나 이해했는지 알 수 있고, 더 오래 기억할 수 있어요."
              }
            ]
          },
          "2": {
            id: "2",
            title: "학습 전략 퀴즈",
            description: "효과적인 학습 방법을 알아보는 퀴즈입니다.",
            questions: [
              {
                id: "q2-1",
                content: "공부할 때 가장 좋은 환경은?",
                options: [
                  "시끄러운 카페",
                  "TV가 켜져 있는 거실",
                  "조용하고 정리된 공간",
                  "친구들과 함께 있는 곳"
                ],
                correctIndex: 2,
                explanation: "조용하고 정리된 공간에서 공부하면 집중력이 높아져요."
              },
              {
                id: "q2-2",
                content: "새로운 내용을 배울 때 가장 좋은 방법은?",
                options: [
                  "이미 알고 있는 것과 연결해서 생각하기",
                  "모든 것을 외우려고 노력하기",
                  "빠르게 읽고 넘어가기",
                  "어려운 부분은 건너뛰기"
                ],
                correctIndex: 0,
                explanation: "새로운 내용을 이미 알고 있는 것과 연결해서 생각하면 더 쉽게 이해하고 기억할 수 있어요."
              },
              // 나머지 문제는 간략화
            ]
          },
          "3": {
            id: "3",
            title: "문제 해결 퀴즈",
            description: "문제를 해결하는 다양한 방법을 배워봅시다.",
            questions: [
              {
                id: "q3-1",
                content: "어려운 문제를 만났을 때 첫 번째로 해야 할 일은?",
                options: [
                  "포기하기",
                  "문제를 정확히 이해하기",
                  "답을 추측해보기",
                  "다른 문제로 넘어가기"
                ],
                correctIndex: 1,
                explanation: "어려운 문제를 해결하려면 먼저 문제가 무엇을 묻고 있는지 정확히 이해하는 것이 중요해요."
              },
              // 나머지 문제는 간략화
            ]
          }
        };
        
        // 실제 API 연동 시 아래 코드 사용
        // const response = await fetch(`/api/quizzes/${id}`);
        // const data = await response.json();
        // setQuiz(data);
        
        // 임시 데이터에서 ID로 퀴즈 찾기
        const foundQuiz = dummyData[id];
        if (foundQuiz) {
          setQuiz(foundQuiz);
        } else {
          router.push("/quizzes");
        }
      } catch (error) {
        console.error("퀴즈 상세 정보 불러오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [id, router]);

  // 답변 제출 핸들러
  const handleAnswer = (questionId: string, selectedIndex: number, isCorrect: boolean) => {
    const newAnswer = { questionId, selectedIndex, isCorrect };
    setAnswers([...answers, newAnswer]);
    
    // 1초 후 다음 문제로 이동하거나 퀴즈 완료
    setTimeout(() => {
      if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizCompleted(true);
        
        // 실제 API 연동 시 결과 저장
        // saveQuizResult();
      }
    }, 1000);
  };

  // 퀴즈 다시 시작 핸들러
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  // 정답 개수 계산
  const getCorrectAnswersCount = () => {
    return answers.filter(answer => answer.isCorrect).length;
  };

  // 로딩 중 UI
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pb-16">
        <div className="animate-pulse bg-gray-200 h-8 w-3/4 rounded-md"></div>
        <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded-md mb-4"></div>
        <div className="animate-pulse bg-gray-200 h-64 w-full rounded-md"></div>
        
        {/* 하단 네비게이션 */}
        <BottomNavigation />
      </div>
    );
  }

  // 퀴즈가 없는 경우
  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center pb-16">
        <h3 className="text-lg font-medium text-gray-800 mb-2">퀴즈를 찾을 수 없어요</h3>
        <p className="text-gray-600 mb-6">삭제되었거나 잘못된 주소예요</p>
        <Link 
          href="/quizzes" 
          className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
        >
          퀴즈 목록으로 돌아가기
        </Link>
        
        {/* 하단 네비게이션 */}
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-16">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
        <p className="text-gray-600">{quiz.description}</p>
      </div>
      
      {/* 진행 상황 */}
      {!quizCompleted && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              문제 {currentQuestionIndex + 1}/{quiz.questions.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* 퀴즈 내용 */}
      {!quizCompleted ? (
        // 현재 문제 표시
        <QuizQuestion 
          question={quiz.questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          isAnswered={answers.some(a => a.questionId === quiz.questions[currentQuestionIndex].id)}
          selectedIndex={answers.find(a => a.questionId === quiz.questions[currentQuestionIndex].id)?.selectedIndex}
        />
      ) : (
        // 퀴즈 결과 표시
        <QuizResult 
          score={getCorrectAnswersCount()}
          totalQuestions={quiz.questions.length}
          onRetry={handleRetry}
        />
      )}
      
      {/* 하단 네비게이션 */}
      <BottomNavigation />
      
      {/* 챗봇 */}
      <ChatBot />
    </div>
  );
}
