"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import SortBar from "../../components/SortBar";

export default function EstimatePage() {
  const router = useRouter();

  // 예시 데이터
  const data = [
    { id: 1, title: "에어컨 설치 문의", applicant: "이영민", date: "2024-02-14" },
    { id: 2, title: "이영희", applicant: "이영희", date: "2024-02-13" },
    { id: 3, title: "박민준", applicant: "박민준", date: "2024-02-12" },
    { id: 4, title: "박지성", applicant: "박지성", date: "2024-02-11" },
    { id: 5, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 6, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 7, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 8, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 9, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 10, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 11, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 12, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 13, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 14, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 16, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 17, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 18, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 19, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 20, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 21, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 22, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 23, title: "테스트", applicant: "테스터", date: "2024-02-10" },
    { id: 24, title: "테스트", applicant: "테스터", date: "2024-02-10" },
  ];

  // 검색 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState<"title" | "applicant">("title");
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // 정렬 상태
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // 필터된 데이터
  const filteredData = data.filter((item) =>
    searchField === "title"
      ? item.title.includes(searchTerm)
      : item.applicant.includes(searchTerm)
  );

  // 정렬 (날짜 기준)
  const sortedData = [...filteredData].sort((a, b) => {
    return sortOrder === "desc"
      ? b.date.localeCompare(a.date)
      : a.date.localeCompare(b.date);
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleCreatePost = () => {
    router.push("/estimate/post");
  };

  const handleSearch = (field: "title" | "applicant", term: string) => {
    setSearchField(field);
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSort = (order: "desc" | "asc") => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      {/* 상단 영역 */}
      <div className="container mx-auto py-8 px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">견적 신청 페이지</h1>
        <button
          onClick={handleCreatePost}
          className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          견적 신청하기
        </button>
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
                <th className="py-3 px-4 w-16">순서</th>
                <th className="py-3 px-4">제목</th>
                <th className="py-3 px-4 w-32">신청자</th>
                <th className="py-3 px-4 w-32">등록일</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, idx) => (
                <tr
                  key={item.id}
                  className="border-b border-grayDark hover:bg-grayDark/40"
                >
                  <td className="py-3 px-4 text-center">
                    {startIndex + idx + 1}
                  </td>
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4 text-center">{item.applicant}</td>
                  <td className="py-3 px-4 text-center">{item.date}</td>
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
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* 페이지네이션 영역 */}
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
