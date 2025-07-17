"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

// 챗 메시지 인터페이스 정의
interface ChatMessage {
  who: "me" | "bot";
  text: string;
}

// 코랩 쳇봇 API URL
const API_BASE: string = process.env.NEXT_PUBLIC_API_BASE ?? "";

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  // 새 메시지가 추가되면 스크롤 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    // 사용자 메시지 추가
    setChat((prev) => [...prev, { who: "me", text }]);
    setInput("");

    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_CHATBOT_API_KEY || "",
        },
        body: JSON.stringify({ message: text }),
      });
      const data: { response: string } = await res.json();

      // 봇 응답 추가
      setChat((prev) => [...prev, { who: "bot", text: data.response }]);
    } catch (error) {
      console.error("Chat API error", error);
      setChat((prev) => [...prev, { who: "bot", text: "죄송합니다. 오류가 발생했어요." }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* 채팅창 모달 */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col">
          {/* 헤더 */}
          <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-t-lg">
            <h2 className="text-lg font-semibold">진명에어컨 에이전트 챗봇</h2>
            <button onClick={toggleOpen} aria-label="닫기">
              <FiX size={20} />
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 p-3 overflow-y-auto">
            {chat.length === 0 ? (
              <p className="text-center text-gray-500 mt-20">에어컨 설치, A/S, 중고에어컨 구매 등 궁금한 것을 물어보세요!</p>
            ) : (
              chat.map((m, i) => (
                <div
                  key={i}
                  className={`mb-2 flex ${m.who === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                      m.who === "me"
                        ? "bg-blue-100 text-gray-800 rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <div className="p-2 border-t border-gray-200 flex">
            <input
              type="text"
              placeholder="메시지를 입력하세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-300 rounded-l-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-1 rounded-r-md hover:bg-blue-700 transition"
            >
              전송
            </button>
          </div>
        </div>
      )}

      {/* 토글 버튼 */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="챗봇 열기"
      >
        <FiMessageCircle size={24} />
      </button>
    </>
  );
}
