"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/chat/ChatMessage";

// 메시지 타입 정의
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// 초등학생을 위한 브레인봇 챗봇 컴포넌트
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userGrade, setUserGrade] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 챗봇 열기/닫기 토글
  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // 처음 열 때 환영 메시지 표시
    if (!isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "안녕! 나는 브레인봇이야. 너의 학습을 도와줄게! 몇 학년이니?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };
  
  // 메시지 전송 처리
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // 학년 확인 및 설정
    if (userGrade === null) {
      const gradeMatch = inputValue.match(/[1-6]/);
      if (gradeMatch) {
        const grade = parseInt(gradeMatch[0], 10);
        setUserGrade(grade);
        
        // 학년에 맞는 환영 메시지
        setTimeout(() => {
          const gradeResponse: Message = {
            id: Date.now().toString(),
            text: `${grade}학년이구나! 반가워. 이제 무엇이든 물어봐줘. 학습에 대한 고민이나 궁금한 점이 있으면 알려줘!`,
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, gradeResponse]);
          setIsTyping(false);
        }, 1000);
      } else {
        // 학년을 명확히 말하지 않은 경우
        setTimeout(() => {
          const askAgain: Message = {
            id: Date.now().toString(),
            text: "1학년부터 6학년까지 있어. 너는 몇 학년이니?",
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, askAgain]);
          setIsTyping(false);
        }, 1000);
      }
      return;
    }
    
    // 사용자 메시지에 대한 응답 생성 (실제 API 호출)
    try {
      // 실제 API 호출
      setIsTyping(true);
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          userGrade,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "챗봇 응답을 생성하는 중 오류가 발생했습니다.");
      }
      
      // API 응답으로 봇 메시지 생성
      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      
    } catch (error) {
      console.error("챗봇 응답 오류:", error);
      
      // 오류 메시지
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "앗, 지금 대답하기 어려워. 잠시 후에 다시 물어봐줄래?",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };
  
  // 스크롤 자동 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <div className="fixed bottom-24 right-4 z-[9999] shadow-2xl">
      {/* 챗봇 버튼 */}
      <button
        onClick={toggleChat}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        aria-label="채팅 열기"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {/* 챗봇 창 */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 h-96 mb-4 flex flex-col overflow-hidden border border-gray-200">
          {/* 챗봇 헤더 */}
          <div className="bg-blue-500 text-white p-3 flex items-center">
            <div className="bg-white text-blue-500 rounded-full p-1 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-bold">브레인봇</h3>
          </div>
          
          {/* 메시지 영역 */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                text={message.text}
                sender={message.sender}
                timestamp={message.timestamp}
              />
            ))}
            
            {/* 타이핑 표시기 */}
            {isTyping && (
              <div className="flex items-center space-x-1 p-2 rounded-lg bg-gray-200 w-16 mt-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* 입력 영역 */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 disabled:bg-blue-300"
              disabled={!inputValue.trim() || isTyping}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
