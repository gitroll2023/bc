"use client";

import JournalForm from "@/components/journals/JournalForm";

// 새 일기 작성 페이지
export default function NewJournalPage() {
  return (
    <div className="flex flex-col pb-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">새 메타인지 일기 쓰기</h1>
      <JournalForm />
    </div>
  );
}
