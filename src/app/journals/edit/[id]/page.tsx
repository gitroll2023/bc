"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JournalForm from "@/components/journals/JournalForm";

// 일기 수정 페이지 props 타입 정의
interface EditJournalPageProps {
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

// 초등학생들을 위한 일기 수정 페이지
export default function EditJournalPage({ params }: EditJournalPageProps) {
  const router = useRouter();
  const [journal, setJournal] = useState<Journal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = params;

  // 일기 데이터 불러오기
  useEffect(() => {
    const fetchJournal = async () => {
      try {
        // API 구현 전 임시 데이터
        const dummyData: Record<string, Journal> = {
          "1": {
            id: "1",
            title: "오늘 배운 분수",
            content: "오늘 수학 시간에 분수에 대해 배웠어요. 처음에는 어려웠지만, 선생님이 피자로 설명해주셔서 이해가 잘 됐어요. 다음에는 더 어려운 분수도 풀 수 있을 것 같아요!",
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

  // 로딩 중 UI
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pb-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">일기 수정하기</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-32 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  // 일기가 없는 경우
  if (!journal) {
    return (
      <div className="flex flex-col pb-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">일기 수정하기</h1>
        <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-md">
          일기를 찾을 수 없어요. 삭제되었거나 잘못된 주소일 수 있어요.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">일기 수정하기</h1>
      <JournalForm 
        initialData={{
          id: journal.id,
          title: journal.title,
          content: journal.content,
          mood: journal.mood,
        }}
        isEditing={true}
      />
    </div>
  );
}
