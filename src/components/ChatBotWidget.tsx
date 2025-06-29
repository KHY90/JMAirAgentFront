"use client";
import React, { useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* 채팅창 모달 */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col">
          {/* 헤더 */}
          <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-t-lg">
            <h2 className="text-lg font-semibold">진명에어컨 쳇봇</h2>
            <button onClick={toggleOpen} aria-label="닫기">
              <FiX size={20} />
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 p-3 overflow-y-auto">
            <p className="text-center text-gray-500 mt-20">대화를 시작해보세요!</p>
          </div>

          {/* 입력 영역 */}
          <div className="p-2 border-t border-gray-200 flex">
            <input
              type="text"
              placeholder="메시지를 입력하세요"
              className="flex-1 border border-gray-300 rounded-l-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-600 text-white px-4 py-1 rounded-r-md hover:bg-blue-700 transition">
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
