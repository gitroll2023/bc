"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import BottomNavigation from "@/components/BottomNavigation";
import dynamic from "next/dynamic";

// 클라이언트 컴포넌트를 동적으로 로드
const ChatBot = dynamic(() => import("@/components/chat/ChatBot"), {
  ssr: false,
});

// 일기 상세 페이지 props 타입 정의
interface JournalDetailPageProps {
  params: {
    id: string;
  };
}

// 일기 타입 정의
interface Journal {
  id: string;
  title: string;
  content: string;
  mood: string;
  createdAt: Date;
}

// 초등학생들을 위한 일기 상세 페이지
export default function JournalDetailPage({ params }: JournalDetailPageProps) {
  const router = useRouter();
  const [journal, setJournal] = useState<Journal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = params;

  // 감정에 따른 이모지 매핑
  const moodEmoji = {
    happy: "😊",
    sad: "😢",
    excited: "🤩",
    confused: "🤔",
    proud: "😎",
    default: "📝",
  };

  // 일기 데이터 불러오기
  useEffect(() => {
    const fetchJournal = async () => {
      try {
        // API 구현 전 임시 데이터
        const dummyData: Record<string, Journal> = {
          "1": {
            id: "1",
            title: "오늘 배운 분수",
            content: "오늘 수학 시간에 분수에 대해 배웠어요. 처음에는 어려웠지만, 선생님이 피자로 설명해주셔서 이해가 잘 됐어요. 다음에는 더 어려운 분수도 풀 수 있을 것 같아요!\n\n처음에는 1/2, 1/4 같은 쉬운 분수로 시작했어요. 피자를 반으로 나누면 1/2, 4등분하면 1/4이 된다는 걸 배웠어요. 어려웠던 부분은 분모가 다른 분수끼리 더하는 방법이었어요. 공통분모를 찾아야 한다는 게 처음에는 이해가 안 됐는데, 선생님이 그림으로 설명해주시니까 이해가 됐어요.\n\n오늘 배운 것을 집에서 복습해봐야겠어요. 다음에 분수 문제가 나오면 더 잘 풀 수 있을 것 같아요!",
            mood: "happy",
            createdAt: new Date(2025, 5, 12),
          },
          "2": {
            id: "2",
            title: "과학 실험 시간",
            content: "오늘 과학 시간에 식물의 광합성에 대해 배웠어요. 햇빛이 있는 곳과 없는 곳에 식물을 두고 어떻게 달라지는지 관찰하는 실험을 시작했어요. 결과가 어떻게 나올지 궁금해요!",
            mood: "excited",
            createdAt: new Date(2025, 5, 10),
          },
          "3": {
            id: "3",
            title: "어려웠던 영어 단어",
            content: "오늘 영어 시간에 새로운 단어를 많이 배웠어요. 'environment'라는 단어가 가장 어려웠어요. 선생님이 '환경'이라고 알려주셨는데, 자꾸 까먹어서 집에 와서 여러 번 썼어요.",
            mood: "confused",
            createdAt: new Date(2025, 5, 8),
          },
        };
        
        // 실제 API 연동 시 아래 코드 사용
        // const response = await fetch(`/api/journals/${id}`);
        // const data = await response.json();
        // setJournal(data);
        
        // 임시 데이터에서 ID로 일기 찾기
        const foundJournal = dummyData[id];
        if (foundJournal) {
          setJournal(foundJournal);
        } else {
          router.push("/journals");
        }
      } catch (error) {
        console.error("일기 상세 정보 불러오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJournal();
  }, [id, router]);

  // 일기 삭제 핸들러
  const handleDelete = async () => {
    if (!confirm("정말로 이 일기를 삭제할까요?")) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      // 실제 API 연동 시 아래 코드 사용
      // await fetch(`/api/journals/${id}`, {
      //   method: "DELETE",
      // });
      
      // 임시 처리
      setTimeout(() => {
        router.push("/journals");
        router.refresh();
      }, 500);
    } catch (error) {
      console.error("일기 삭제 오류:", error);
      alert("일기를 삭제하는 중에 문제가 생겼어요. 다시 시도해 볼까요?");
      setIsDeleting(false);
    }
  };

  // 로딩 중 UI
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pb-20">
        <div className="flex items-center mb-2">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-blue-500 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            뒤로가기
          </button>
        </div>
        <div className="animate-pulse bg-gray-200 h-8 w-3/4 rounded-md"></div>
        <div className="animate-pulse bg-gray-200 h-4 w-1/4 rounded-md mb-4"></div>
        <div className="animate-pulse bg-gray-200 h-32 w-full rounded-md"></div>
        <BottomNavigation />
        <ChatBot />
      </div>
    );
  }

  // 일기가 없는 경우
  if (!journal) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-full flex items-center mb-4 px-4">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-blue-500 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            뒤로가기
          </button>
        </div>
        <div className="bg-red-100 text-red-500 p-4 rounded-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-bold">일기를 찾을 수 없어요</h3>
        </div>
        <p className="text-gray-600 mb-6">찾으시는 일기가 없거나 삭제되었을 수 있어요.</p>
        <Link href="/journals" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          일기 목록으로 돌아가기
        </Link>
        <BottomNavigation />
        <ChatBot />
      </div>
    );
  }

  // 시간 형식 변환 (예: '3일 전')
  const timeAgo = formatDistanceToNow(new Date(journal.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="flex flex-col pb-20">
      {/* 뒤로가기 버튼 */}
      <div className="flex items-center mb-2">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-blue-500 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          뒤로가기
        </button>
      </div>
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{journal.title}</h1>
        <span className="text-3xl" role="img" aria-label={journal.mood}>
          {moodEmoji[journal.mood as keyof typeof moodEmoji] || moodEmoji.default}
        </span>
      </div>
      
      {/* 작성 시간 */}
      <div className="text-sm text-gray-500 mb-6">{timeAgo}</div>
      
      {/* 내용 */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
        <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {journal.content}
        </p>
      </div>
      
      {/* 메타인지 피드백 (AI 피드백 구현 시 활용) */}
      <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <h3 className="font-bold text-purple-800">두뇌 코치의 생각</h3>
        </div>
        <p className="text-sm text-purple-700">
          {journal.id === "1" ? (
            "분수를 배우면서 어려운 부분을 찾아내고, 이해하기 위해 노력했군요! 선생님의 설명을 통해 이해하게 된 과정을 잘 기록했어요. 다음에는 어떤 방법으로 분수를 더 쉽게 이해할 수 있을지 생각해보는 것도 좋을 것 같아요."
          ) : journal.id === "2" ? (
            "과학 실험에 대한 호기심이 느껴져요! 실험 결과를 예측해보고, 왜 그런 결과가 나올지 이유를 생각해보면 더 깊이 이해할 수 있을 거예요."
          ) : (
            "어려운 단어를 외우기 위해 반복해서 쓰는 방법을 찾았네요! 다른 기억 방법도 시도해보면 어떨까요? 예를 들어, 'environment'를 그림으로 그려보거나, 단어를 사용한 짧은 문장을 만들어보는 것도 도움이 될 수 있어요."
          )}
        </p>
      </div>
      
      {/* 버튼 그룹 */}
      <div className="flex gap-3">
        <Link 
          href={`/journals/edit/${journal.id}`}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-600"
        >
          수정하기
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 bg-red-100 text-red-600 py-2 px-4 rounded-md hover:bg-red-200 disabled:opacity-50"
        >
          {isDeleting ? "삭제 중..." : "삭제하기"}
        </button>
      </div>
      
      {/* 하단 네비게이션 */}
      <BottomNavigation />
      
      {/* 챗봇 */}
      <ChatBot />
    </div>
  );
}
