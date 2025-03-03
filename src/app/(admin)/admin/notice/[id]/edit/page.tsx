"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminNoticeEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const noticeId = Number(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const dummyNotice = {
      id: noticeId,
      title: "예시 공지사항 제목",
      content:
        "공지사항 상세 내용입니다. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    };
    setTitle(dummyNotice.title);
    setContent(dummyNotice.content);
  }, [noticeId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`공지사항 ${noticeId} 수정 완료!\n제목: ${title}\n내용: ${content}`);
    router.push(`/admin/notice/${noticeId}`);
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("수정을 취소하시겠습니까?");
    if (confirmCancel) {
      router.back();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">공지사항 수정</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow p-4 max-w-3xl mx-auto"
      >
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

        <div className="flex space-x-2 justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            수정 완료
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
