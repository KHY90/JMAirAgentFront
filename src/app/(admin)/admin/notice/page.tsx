"use client";
import { useRouter } from "next/navigation";

export default function AdminNoticeListPage() {
  const router = useRouter();

  // 임시 데이터
  const notices = [
    { id: 1, title: "새로운 업데이트 안내", date: "2024-02-15", views: 120 },
    { id: 2, title: "설 연휴 휴무 안내", date: "2024-02-10", views: 85 },
    { id: 3, title: "이벤트 당첨자 발표", date: "2024-02-08", views: 95 },
  ];

  // 등록 버튼 클릭 시 등록 페이지로 이동
  const handleCreate = () => {
    router.push("/admin/notice/create");
  };

  // 제목 클릭 시 상세 페이지로 이동
  const handleTitleClick = (id: number) => {
    router.push(`/admin/notice/${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">공지사항 목록</h1>

      {/* 등록 버튼 */}
      <div className="mb-4">
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          등록
        </button>
      </div>

      {/* 목록 테이블 */}
      <div className="overflow-x-auto bg-white rounded shadow p-4">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="py-2 px-2 w-16">번호</th>
              <th className="py-2 px-2">제목</th>
              <th className="py-2 px-2 w-32 text-center">작성일</th>
              <th className="py-2 px-2 w-20 text-center">조회수</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice, idx) => (
              <tr key={notice.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2 text-center">{idx + 1}</td>
                <td
                  className="py-2 px-2 cursor-pointer text-black"
                  onClick={() => handleTitleClick(notice.id)}
                >
                  {notice.title}
                </td>
                <td className="py-2 px-2 text-center">{notice.date}</td>
                <td className="py-2 px-2 text-center">{notice.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
