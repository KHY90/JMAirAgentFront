"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function AdminNoticeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const noticeId = Number(params.id);

  // 예시 데이터 (실제로는 noticeId 기반으로 API Fetch)
  const notice = {
    id: noticeId,
    title: "예시 공지사항 제목",
    date: "2024-02-15",
    views: 123,
    content: "공지사항 상세 내용입니다...",
    writer: "관리자",
  };

  // 목록으로 버튼
  const handleBack = () => {
    router.push("/admin/notice");
  };

  // 수정 버튼 (수정 페이지 예시)
  const handleEdit = () => {
    alert("수정 페이지 이동 (예시)");
    // router.push(`/admin/notice/${noticeId}/edit`);
  };

  // 삭제 버튼 (실제 로직은 API 요청 후 목록으로)
  const handleDelete = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      alert(`공지사항 ${noticeId} 삭제 완료 (예시)`);
      router.push("/admin/notice");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">공지사항 상세</h1>
      <div className="bg-white rounded shadow p-4 max-w-3xl">
        <div className="mb-2 border-b pb-2">
          <h2 className="text-xl font-semibold">{notice.title}</h2>
          <div className="text-sm text-gray-500 flex justify-between">
            <span>작성자: {notice.writer}</span>
            <span>작성일: {notice.date}</span>
            <span>조회수: {notice.views}</span>
          </div>
        </div>
        <div className="py-4">
          <p>{notice.content}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleBack}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            목록
          </button>
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
