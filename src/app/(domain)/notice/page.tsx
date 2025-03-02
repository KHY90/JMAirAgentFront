"use client";
import { useRouter } from "next/navigation";
import NoticeSearchBar from "../../components/NoticeSearchBar";
import SortBar from "../../components/SortBar";
import Pagination from "../../components/Pagination";
import { NoticeItem, useNotice } from "../../hooks/useNotice";

export default function NoticePage() {
  const router = useRouter();

  // 예시 공지사항 데이터
  const data: NoticeItem[] = [
    { id: 1, title: "새로운 업데이트 안내", writer: "관리자", date: "2024-02-15", viewCount: 120 },
    { id: 2, title: "설 연휴 휴무 안내", writer: "운영팀", date: "2024-02-10", viewCount: 85 },
    { id: 3, title: "이벤트 당첨자 발표", writer: "마케팅", date: "2024-02-08", viewCount: 95 },
    { id: 4, title: "서비스 점검 공지", writer: "관리자", date: "2024-02-05", viewCount: 110 },
    { id: 5, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 6, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 7, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 8, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 9, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 10, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 11, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 12, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 13, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 14, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 15, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 16, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 17, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 18, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 19, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
    { id: 20, title: "신규 기능 소개", writer: "운영팀", date: "2024-02-01", viewCount: 75 },
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

  const handleTitleClick = (id: number) => {
    router.push(`/notice/${id}`);
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      {/* 상단 */}
      <div className="container mx-auto py-8 px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">공지사항</h1>
      </div>

      {/* 정렬 */}
      <div className="container mx-auto px-4 mb-2 flex justify-end">
        <SortBar onSort={handleSort} />
      </div>

      {/* 테이블 */}
      <div className="container mx-auto px-4 flex-1">
        <div className="overflow-x-auto w-full border border-grayDark rounded-md">
          <table className="w-full text-left">
            <thead className="bg-grayDark/50">
              <tr>
                <th className="py-3 px-4 w-16">번호</th>
                <th className="py-3 px-4">제목</th>
                <th className="py-3 px-4 w-32 text-center">작성자</th>
                <th className="py-3 px-4 w-32 text-center">작성일</th>
                <th className="py-3 px-4 w-24 text-center">조회수</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((notice, idx) => (
                <tr
                  key={notice.id}
                  className="border-b border-grayDark hover:bg-grayDark/40"
                >
                  {/* 번호 */}
                  <td className="py-3 px-4 text-center">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>

                  {/* 제목 */}
                  <td
                    className="py-3 px-4 cursor-pointer text-black"
                    onClick={() => handleTitleClick(notice.id)}
                  >
                    {notice.title}
                  </td>

                  {/* 작성자 */}
                  <td className="py-3 px-4 text-center">{notice.writer}</td>

                  {/* 작성일일 */}
                  <td className="py-3 px-4 text-center">{notice.date}</td>

                  {/* 조회수 */}
                  <td className="py-3 px-4 text-center">{notice.viewCount}</td>
                </tr>
              ))}

              {displayedData.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-3 px-4 text-center text-gray-400">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 검색창 */}
        <div className="container mx-auto px-4 mt-4 flex justify-center">
          <NoticeSearchBar onSearch={handleSearch} />
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
