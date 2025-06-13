"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import JournalCard from "@/components/journals/JournalCard";
import BottomNavigation from "@/components/BottomNavigation";
import dynamic from "next/dynamic";

// 클라이언트 컴포넌트를 동적으로 로드
const ChatBot = dynamic(() => import("@/components/chat/ChatBot"), {
  ssr: false,
});

// 일기 타입 정의
interface Journal {
  id: string;
  title: string;
  content: string;
  mood: string;
  createdAt: Date;
}

// 초등학생들을 위한 일기 목록 페이지
export default function JournalsPage() {
  const router = useRouter();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 일기 목록 불러오기
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        // API 구현 전 임시 데이터
        const dummyData: Journal[] = [
          {
            id: "1",
            title: "오늘 배운 분수",
            content: "오늘 수학 시간에 분수에 대해 배웠어요. 처음에는 어려웠지만, 선생님이 피자로 설명해주셔서 이해가 잘 됐어요. 다음에는 더 어려운 분수도 풀 수 있을 것 같아요!",
            mood: "happy",
            createdAt: new Date(2025, 5, 12),
          },
          {
            id: "2",
            title: "과학 실험 시간",
            content: "오늘 과학 시간에 식물의 광합성에 대해 배웠어요. 햇빛이 있는 곳과 없는 곳에 식물을 두고 어떻게 달라지는지 관찰하는 실험을 시작했어요. 결과가 어떻게 나올지 궁금해요!",
            mood: "excited",
            createdAt: new Date(2025, 5, 10),
          },
          {
            id: "3",
            title: "어려웠던 영어 단어",
            content: "오늘 영어 시간에 새로운 단어를 많이 배웠어요. 'environment'라는 단어가 가장 어려웠어요. 선생님이 '환경'이라고 알려주셨는데, 자꾸 까먹어서 집에 와서 여러 번 썼어요.",
            mood: "confused",
            createdAt: new Date(2025, 5, 8),
          },
        ];
        
        // 실제 API 연동 시 아래 코드 사용
        // const response = await fetch("/api/journals");
        // const data = await response.json();
        // setJournals(data);
        
        setJournals(dummyData);
      } catch (error) {
        console.error("일기 목록 불러오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJournals();
  }, []);

  // 일기 카드 클릭 핸들러
  const handleJournalClick = (id: string) => {
    router.push(`/journals/${id}`);
  };

  return (
    <div className="flex flex-col pb-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">나의 메타인지 일기</h1>
        <Link 
          href="/journals/new" 
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          새 일기
        </Link>
      </div>

      {isLoading ? (
        // 로딩 상태
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-xl w-full"></div>
          ))}
        </div>
      ) : journals.length > 0 ? (
        // 일기 목록
        <div className="space-y-4">
          {journals.map((journal) => (
            <JournalCard
              key={journal.id}
              id={journal.id}
              title={journal.title}
              content={journal.content}
              mood={journal.mood}
              createdAt={journal.createdAt}
              onClick={handleJournalClick}
            />
          ))}
        </div>
      ) : (
        // 일기가 없는 경우
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">아직 일기가 없어요</h3>
          <p className="text-gray-600 mb-6">오늘 배운 것을 기록해 볼까요?</p>
          <Link 
            href="/journals/new" 
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
          >
            첫 일기 쓰기
          </Link>
        </div>
      )}
      
      {/* 하단 네비게이션 */}
      <BottomNavigation />
      
      {/* 챗봇 */}
      <ChatBot />
    </div>
  );
}
