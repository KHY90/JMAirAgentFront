"use client";
import { useRouter } from "next/navigation";
import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import Pagination from "../../components/Pagination";
import { NoticeItem, useNotice } from "../../hooks/useNotice";

export default function NoticePage() {
  const router = useRouter();

  // 예시 공지사항 데이터
  const data: NoticeItem[] = [
    { id: 1, title: "새로운 업데이트 안내", writer: "관리자", date: "2024-02-15" },
    { id: 2, title: "설 연휴 휴무 안내", writer: "운영팀", date: "2024-02-10" },
    { id: 3, title: "이벤트 당첨자 발표", writer: "마케팅", date: "2024-02-08" },
    { id: 4, title: "서비스 점검 공지", writer: "관리자", date: "2024-02-05" },
    { id: 5, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01" },
  ];

  const itemsPerPage = 5;

  const {
    displayedData,
    totalPages,
    currentPage,
    setSearch,
    setPage,
    setSortOrder,
  } = useNotice(data, itemsPerPage);

  // 검색 콜백
  const handleSearch = (field: "title" | "writer", term: string) => {
    setSearch(field, term);
  };

  // 정렬 콜백
  const handleSort = (order: "desc" | "asc") => {
    setSortOrder(order);
  };

  // 페이지 변경 콜백
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      {/* 상단 영역 */}
      <div className="container mx-auto py-8 px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">공지사항</h1>
      </div>

      {/* 정렬 박스 */}
      <div className="container mx-auto px-4 mb-2 flex justify-end">
        <SortBar onSort={handleSort} />
      </div>

      {/* 테이블 영역 */}
      <div className="container mx-auto px-4 flex-1">
        <div className="overflow-x-auto w-full border border-grayDark rounded-md">
          <table className="w-full text-left">
            <thead className="bg-grayDark/50">
              <tr>
                <th className="py-3 px-4 w-16">번호</th>
                <th className="py-3 px-4">제목</th>
                <th className="py-3 px-4 w-32">작성자</th>
                <th className="py-3 px-4 w-32">작성일</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((notice, idx) => (
                <tr
                  key={notice.id}
                  className="border-b border-grayDark hover:bg-grayDark/40"
                >
                  <td className="py-3 px-4 text-center">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td className="py-3 px-4">{notice.title}</td>
                  <td className="py-3 px-4 text-center">{notice.writer}</td>
                  <td className="py-3 px-4 text-center">{notice.date}</td>
                </tr>
              ))}
              {displayedData.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-3 px-4 text-center text-gray-400">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 검색창 */}
        <div className="container mx-auto px-4 mt-4 flex justify-center">
          {/* SearchBar는 onSearch에 (field, term)을 넘겨주어야 함 */}
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* 페이지네이션 */}
        <div className="container mx-auto px-4 mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
