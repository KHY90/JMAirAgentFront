"use client";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import authStore from "@/utils/authStore";
import { EngineerStatus } from "@/types/mypage";
import { getGradeText } from "@/utils/transform";

export default function MyPageEngineerApply() {
  const [info, setInfo] = useState<EngineerStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStatus = useCallback(async () => {
    if (!authStore.isAuthenticated) return;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/engineer`,
        { withCredentials: true }
      );
      setInfo(res.data);
    } catch (err) {
      console.error("설치기사 상태 조회 오류:", err);
      setError("상태를 불러오지 못했습니다.");
    }
  }, []);

  const handleApply = async () => {
    if (!authStore.isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/engineer`,
        null,
        { withCredentials: true }
      );
      alert("설치기사 신청이 완료되었습니다.");
      fetchStatus();
    } catch (err) {
      console.error("설치기사 신청 오류:", err);
      alert("신청에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const formattedDate = info?.appliedAt
    ? new Date(info.appliedAt).toLocaleDateString("ko-KR")
    : "";

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">설치기사 신청</h2>
      {error && (
        <div className="text-red-500 bg-red-100 p-2 rounded">{error}</div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded min-w-[320px] text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">신청 상태</th>
              <th className="py-2 px-4">신청일</th>
            </tr>
          </thead>
          <tbody>
            {info ? (
              <tr>
                <td className="py-2 px-4">{getGradeText(info.status)}</td>
                <td className="py-2 px-4">{formattedDate}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={2} className="py-3">
                  신청 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleApply}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "신청 중..." : "설치기사로 신청하기"}
        </button>
      </div>
    </div>
  );
}
