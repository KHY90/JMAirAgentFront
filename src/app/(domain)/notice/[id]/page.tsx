"use client";
import { useRouter, useParams } from "next/navigation";
import React from "react";

export default function NoticeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  // 예시 공지
  const notice = {
    id,
    title: "예시 공지사항 제목",
    writer: "관리자",
    date: "2024-02-15",
    viewCount: 123,
    content:
      "여기에 공지사항 내용이 표시됩니다. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{notice.title}</h1>
      <div className="mb-4 text-gray-600">
        <span>작성자: {notice.writer}</span>
        <span className="mx-4">작성일: {notice.date}</span>
        <span>조회수: {notice.viewCount}</span>
      </div>
      <div className="border-t border-gray-300 pt-4">
        <p className="text-lg leading-relaxed">{notice.content}</p>
      </div>
      <button 
        onClick={() => router.back()} 
        className="mt-6 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        목록으로
      </button>
    </div>
  );
}
