import WelcomeCard from "@/components/home/WelcomeCard";
import ActivityCard from "@/components/home/ActivityCard";
import ProgressCard from "@/components/home/ProgressCard";
import TipCard from "@/components/home/TipCard";
import BottomNavigation from "@/components/BottomNavigation";
import dynamic from "next/dynamic";

// 클라이언트 컴포넌트를 동적으로 로드
const ChatBot = dynamic(() => import("@/components/chat/ChatBot"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex flex-col gap-6 pb-16 relative">
      {/* 대화형 AI 두뇌봇 */}
      <ChatBot />
      {/* 환영 카드 */}
      <WelcomeCard />
      
      {/* 메타인지 설명 카드 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl shadow-sm border border-blue-100">
        <h2 className="text-lg font-bold mb-2 text-blue-700">메타인지가 뭐예요?</h2>
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-700 mb-2">메타인지는 <span className="font-bold text-blue-600">내 생각을 살펴보는 능력</span>이에요. 마치 내 마음을 관찰하는 작은 친구가 있는 것처럼 생각해보세요!</p>
            <p className="text-gray-700 mb-2">예를 들어, 수학 문제를 풀 때:</p>
            <ul className="list-disc pl-5 mb-2 text-gray-700">
              <li>"이 문제를 어떻게 풀지 알고 있나요?"</li>
              <li>"내가 이해하지 못한 부분이 있나요?"</li>
              <li>"다른 방법으로 풀 수 있을까요?"</li>
            </ul>
            <p className="text-gray-700">이렇게 내 생각을 살펴보면 <span className="font-bold text-purple-600">공부를 더 잘할 수 있고, 문제를 더 잘 해결할 수 있어요!</span></p>
          </div>
        </div>
      </div>
      
      {/* 팁 카드 */}
      <TipCard />
      
      {/* 활동 섹션 */}
      <div>
        <h2 className="text-lg font-bold mb-3 text-gray-800">오늘의 활동</h2>
        <div className="grid grid-cols-1 gap-3">
          <ActivityCard 
            title="메타인지 일기" 
            description="오늘 배운 것을 기록해요"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
            }
            color="bg-blue-500"
            href="/journals"
          />
          <ActivityCard 
            title="학습 목표" 
            description="나의 목표를 확인해요"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
            }
            color="bg-green-500"
            href="/goals"
          />
          <ActivityCard 
            title="메타인지 퀴즈" 
            description="재미있는 퀴즈를 풀어요"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-600">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
              </svg>
            }
            color="bg-purple-500"
            href="/quizzes"
          />
        </div>
      </div>
      
      {/* 진행 상황 섹션 */}
      <div>
        <h2 className="text-lg font-bold mb-3 text-gray-800">나의 진행 상황</h2>
        <div className="grid grid-cols-1 gap-3">
          <ProgressCard 
            title="일기 작성" 
            value={3} 
            maxValue={7} 
            color="bg-blue-500" 
          />
          <ProgressCard 
            title="목표 달성" 
            value={2} 
            maxValue={5} 
            color="bg-green-500" 
          />
          <ProgressCard 
            title="퀴즈 점수" 
            value={80} 
            maxValue={100} 
            color="bg-purple-500" 
          />
        </div>
      </div>
      
      {/* 하단 네비게이션 */}
      <BottomNavigation />
    </div>
  );
}
