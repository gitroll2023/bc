"use client";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked: boolean;
}

interface ProfileAchievementsProps {
  achievements: Achievement[];
}

// 프로필 업적 컴포넌트 - 사용자가 획득한 업적 표시
export default function ProfileAchievements({ achievements }: ProfileAchievementsProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
      <h3 className="font-bold text-gray-800 mb-3">나의 업적</h3>
      
      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`flex items-center p-3 rounded-lg ${
              achievement.isUnlocked 
                ? 'bg-yellow-50 border border-yellow-100' 
                : 'bg-gray-50 border border-gray-100'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              achievement.isUnlocked 
                ? 'bg-yellow-100 text-yellow-600' 
                : 'bg-gray-200 text-gray-400'
            }`}>
              {achievement.icon}
            </div>
            
            <div className="flex-1">
              <h4 className={`font-medium ${
                achievement.isUnlocked ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {achievement.title}
              </h4>
              <p className={`text-xs ${
                achievement.isUnlocked ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>
            </div>
            
            {achievement.isUnlocked && (
              <div className="text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
