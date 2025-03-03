"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AdminNoticeCreatePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 등록 핸들러 (실제 로직은 API 요청 등)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`제목: ${title}\n내용: ${content}\n등록 완료 (예시)`);

    // 등록 후 목록 페이지로 이동
    router.push("/admin/notice");
  };

  // 취소 버튼
  const handleCancel = () => {
    router.back();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">공지사항 등록</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 max-w-2xl">
        <div className="mb-4">
          <label className="block font-semibold mb-1">제목</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="공지사항 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">내용</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 h-40"
            placeholder="공지사항 내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            등록
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
