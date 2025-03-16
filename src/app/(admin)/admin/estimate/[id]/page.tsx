"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface InstallDTO {
  installId: number;
  installName: string;
  installAddress: string;
  installDetailAddress: string;
  installPhone: string;
  installNumber: string;
  installEmail: string;
  installDescription: string;
  requestDate: string;
  reservationFirstDate?: string;
  reservationSecondDate?: string;
  installStatus: string;
  installNote?: string;
}

export default function EstimateDetailAdminPage() {
  const { id } = useParams();
  const router = useRouter();
  const [detailData, setDetailData] = useState<InstallDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("잘못된 접근입니다.");
      return;
    }
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/install/${id}`,
          { withCredentials: true }
        );
        setDetailData(res.data);
      } catch (err) {
        console.error("견적 신청 상세 조회 오류:", err);
        setError("견적 신청 상세 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("ko-KR");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500">
        {error}
      </div>
    );
  }

  if (!detailData) return null;

  return (
    <div className="min-h-screen bg-white text-black p-6 font-gowun">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">견적 신청 상세 정보</h1>
        <div className="border border-gray-300 rounded p-6">
          <p>
            <strong>신청 ID:</strong> {detailData.installId}
          </p>
          <p>
            <strong>이름:</strong> {detailData.installName}
          </p>
          <p>
            <strong>전화번호:</strong> {detailData.installPhone}
          </p>
          <p>
            <strong>이메일:</strong> {detailData.installEmail}
          </p>
          <p>
            <strong>주소:</strong> {detailData.installAddress}
          </p>
          <p>
            <strong>상세주소:</strong> {detailData.installDetailAddress}
          </p>
          <p>
            <strong>신청 내용:</strong> {detailData.installDescription}
          </p>
          <p>
            <strong>희망 일정 1:</strong>{" "}
            {detailData.reservationFirstDate || "없음"}
          </p>
          <p>
            <strong>희망 일정 2:</strong>{" "}
            {detailData.reservationSecondDate || "없음"}
          </p>
          <p>
            <strong>신청 날짜:</strong> {formatDate(detailData.requestDate)}
          </p>
          <p>
            <strong>상태:</strong> {detailData.installStatus}
          </p>
          {detailData.installNote && (
            <p>
              <strong>비고:</strong> {detailData.installNote}
            </p>
          )}
        </div>
        <div className="mt-6">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
}
