import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini API 키 설정
const apiKey = process.env.GEMINI_API_KEY || "";

// Gemini API 클라이언트 초기화
const genAI = new GoogleGenerativeAI(apiKey);

// 초등학생 학년별 프롬프트 설정
const getGradeSpecificPrompt = (grade: number) => {
  const basePrompt = `당신은 초등학생을 위한 메타인지 학습 도우미 '브레인봇'입니다. 
항상 친절하고 긍정적인 태도로 대화하며, 메타인지적 사고를 장려합니다.
학생이 자신의 생각과 학습 과정을 스스로 인식하고 조절할 수 있도록 도와주세요.
부정적인 생각은 긍정적으로 바꿔주고, 긍정적인 생각은 칭찬해주세요.
복잡한 개념은 쉽게 설명하고, 학생이 스스로 답을 찾을 수 있도록 유도질문을 사용하세요.
답변은 2-3문장 정도로 간결하게 해주세요.`;

  // 학년별 맞춤 프롬프트 추가
  if (grade <= 2) {
    // 1-2학년: 매우 쉬운 언어, 짧은 문장
    return `${basePrompt}
현재 대화 상대는 초등학교 ${grade}학년 학생입니다.
매우 쉬운 단어와 짧은 문장을 사용하세요.
어려운 개념은 일상생활의 예시로 설명하세요.
이모티콘을 적절히 사용하고 친근한 말투로 대화하세요.
답변은 1-2문장으로 매우 짧게 해주세요.`;
  } else if (grade <= 4) {
    // 3-4학년: 쉬운 언어, 기본적인 개념 설명
    return `${basePrompt}
현재 대화 상대는 초등학교 ${grade}학년 학생입니다.
쉬운 단어와 간단한 문장을 사용하세요.
기본적인 메타인지 개념을 설명할 수 있지만, 구체적인 예시를 함께 제공하세요.
친근하고 격려하는 말투로 대화하세요.
답변은 2-3문장으로 간결하게 해주세요.`;
  } else {
    // 5-6학년: 약간 더 복잡한 개념 도입 가능
    return `${basePrompt}
현재 대화 상대는 초등학교 ${grade}학년 학생입니다.
일상적인 단어를 사용하되, 간단한 메타인지 용어를 설명과 함께 도입할 수 있습니다.
학생이 자신의 사고 과정을 분석하고 개선할 수 있도록 도와주세요.
친근하면서도 약간 더 성숙한 말투로 대화하세요.
답변은 2-4문장으로 해주세요.`;
  }
};

// 챗봇 응답 생성 함수
export async function generateChatResponse(message: string, userGrade: number) {
  try {
    // 모델 선택 (Gemini 1.5 Flash 사용)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 챗 세션 생성
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
      systemInstruction: getGradeSpecificPrompt(userGrade),
    });

    // 응답 생성
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Gemini API 오류:", error);
    throw new Error("챗봇 응답을 생성하는 중 오류가 발생했습니다.");
  }
}
