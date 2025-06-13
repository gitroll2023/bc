import { NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, userGrade } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: "메시지가 필요합니다." },
        { status: 400 }
      );
    }
    
    if (!userGrade || isNaN(userGrade) || userGrade < 1 || userGrade > 6) {
      return NextResponse.json(
        { error: "유효한 학년(1-6)이 필요합니다." },
        { status: 400 }
      );
    }
    
    // Gemini API를 사용하여 응답 생성
    const response = await generateChatResponse(message, userGrade);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error("챗봇 API 오류:", error);
    return NextResponse.json(
      { error: "챗봇 응답을 생성하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
