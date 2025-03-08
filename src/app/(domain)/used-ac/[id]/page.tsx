"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";

// 상세 페이지 예시 데이터 타입
interface UsedAcDetail {
  id: number;
  title: string;
  price: number;
  usageTime: string;
  year: string;
  content: string;
}

export default function UsedAcDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  // 가령 서버에서 가져온다고 가정
  const detailData: UsedAcDetail = {
    id,
    title: "삼성 벽걸이 에어컨 (2021년형)",
    price: 320000,
    usageTime: "사용기간: 2년",
    year: "2021년형",
    content: "이 에어컨은 ...\n(자세한 설명)",
  };

  const handleContact = () => {
    alert("구매 문의하기 클릭됨! 예: 전화 연결 or 채팅 연결 etc.");
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 font-gowun">
      <div className="max-w-5xl mx-auto">
        {/* 이미지 + 정보 영역 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* 메인 이미지 */}
          <div className="flex-1">
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-gray-500 text-sm">600 x 400</span>
            </div>
            {/* 작은 썸네일 이미지 목록 */}
            <div className="flex gap-2">
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xs">150 x 150</span>
              </div>
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xs">150 x 150</span>
              </div>
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xs">150 x 150</span>
              </div>
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xs">150 x 150</span>
              </div>
            </div>
          </div>

          {/* 제품 정보 */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">{detailData.title}</h1>
            <p className="text-xl mb-2">
              {detailData.price.toLocaleString()}원
            </p>
            <p className="text-grayDark mb-2">{detailData.usageTime}</p>
            <p className="text-grayDark mb-2">제품연식: {detailData.year}</p>
            <p className="text-grayDark mb-2">배관: 5m</p>
            <p className="text-grayDark mb-2">실외기: 포함</p>
            <p className="text-grayDark mb-2">무상A/S: 1개월</p>
            <p className="text-grayDark mb-6">
              판매자 연락처: 010-1234-5678
            </p>

            <button
              onClick={handleContact}
              className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              구매 문의하기
            </button>
          </div>
        </div>

        {/* 상세 설명 */}
        <div className="mt-8 bg-gray-50 p-4 border border-gray-200 rounded">
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {detailData.content}
          </p>
        </div>
      </div>
    </div>
  );
}
