"use client";

import Link from "next/link";

// 활동 카드 컴포넌트 타입 정의
interface ActivityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

// 초등학생들을 위한 활동 카드 컴포넌트
export default function ActivityCard({
  title,
  description,
  icon,
  color,
  href,
}: ActivityCardProps) {
  return (
    <Link href={href}>
      <div className={`p-4 rounded-xl ${color} shadow-sm transition-transform hover:scale-105 cursor-pointer`}>
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full">{icon}</div>
          <div>
            <h3 className="font-bold text-white">{title}</h3>
            <p className="text-sm text-white/90">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
