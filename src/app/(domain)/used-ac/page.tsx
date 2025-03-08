"use client";
import React from "react";
import { useRouter } from "next/navigation";

// 중고 에어컨 목록 아이템 타입 (예시)
interface UsedAcItem {
  id: number;
  title: string;
  price: number;
  usageTime: string;
  year: string; // ex) "2021년형"
  // 이미지나 썸네일 URL 등등
}

export default function UsedAcListPage() {
  const router = useRouter();

  // 예시 데이터
  const usedAcList: UsedAcItem[] = [
    {
      id: 1,
      title: "삼성 벽걸이 에어컨 (2021년형)",
      price: 320000,
      usageTime: "사용기간: 2년",
      year: "2021년형",
    },
    {
      id: 2,
      title: "LG 스탠드 에어컨 (2020년형)",
      price: 450000,
      usageTime: "사용기간: 3년",
      year: "2020년형",
    },
    {
      id: 3,
      title: "위니아 벽걸이 에어컨 (2022년형)",
      price: 280000,
      usageTime: "사용기간: 1년",
      year: "2022년형",
    },
  ];

  const handleDetail = (id: number) => {
    router.push(`/used-ac/${id}`);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 font-gowun">
      <h1 className="text-2xl font-bold mb-6">중고 에어컨 목록</h1>

      {/* 목록을 그리드 형태로 배치 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {usedAcList.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded p-4 hover:shadow-lg transition-shadow"
          >
            {/* 이미지 대신 400 x 300 박스 모양 */}
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-gray-500 text-sm">400 x 300</span>
            </div>
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-grayDark mb-1">
              {item.price.toLocaleString()}원
            </p>
            <p className="text-grayDark mb-2">{item.usageTime}</p>
            <button
              onClick={() => handleDetail(item.id)}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              상세보기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
