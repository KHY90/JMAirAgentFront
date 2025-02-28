import { useState, useMemo } from "react";

export type SearchField = "title" | "applicant";
export type SortOrder = "desc" | "asc";

export interface EstimateItem {
  id: number;
  title: string;
  applicant: string;
  date: string;
}

export interface UseEstimateReturn {
  displayedData: EstimateItem[];
  totalPages: number;
  currentPage: number;
  searchTerm: string;
  searchField: SearchField;
  sortOrder: SortOrder;
  setSearch: (field: SearchField, term: string) => void;
  setPage: (page: number) => void;
  setSortOrder: (order: SortOrder) => void;
}

export function useEstimate(data: EstimateItem[], itemsPerPage: number = 10): UseEstimateReturn {
  // 검색 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState<SearchField>("title");
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  // 정렬 상태
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // 검색 기준에 따라 데이터 필터링
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      searchField === "title"
        ? item.title.includes(searchTerm)
        : item.applicant.includes(searchTerm)
    );
  }, [data, searchField, searchTerm]);

  // 정렬 (날짜 기준)
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      return sortOrder === "desc"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date);
    });
  }, [filteredData, sortOrder]);

  // 총 페이지 수 계산
  const totalPages = useMemo(() => Math.ceil(sortedData.length / itemsPerPage), [sortedData, itemsPerPage]);

  // 현재 페이지에 표시할 데이터
  const displayedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  // 검색 상태 업데이트: 검색 기준과 검색어를 변경하고, 페이지 번호 초기화
  const setSearch = (field: SearchField, term: string) => {
    setSearchField(field);
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // 페이지 번호 업데이트 (범위 체크)
  const setPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // 정렬 순서 업데이트 및 페이지 초기화
  const updateSortOrder = (order: SortOrder) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  return {
    displayedData,
    totalPages,
    currentPage,
    searchTerm,
    searchField,
    sortOrder,
    setSearch,
    setPage,
    setSortOrder: updateSortOrder,
  };
}
