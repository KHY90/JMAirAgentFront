"use client";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import authStore from "@/utils/authStore";
import { getInstallStatusText } from "@/utils/transform";
import { InstallRequest, ServiceRequest, CleanRequest } from "@/types/requests";
import { RequestItem } from "@/types/mypage";

export default function MyPageRequests() {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    if (!authStore.isAuthenticated) return;
    setLoading(true);
    setError("");
    try {
      const [installRes, serviceRes, cleanRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/install/my`, { withCredentials: true }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/my`, { withCredentials: true }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clean/my`, { withCredentials: true }),
      ]);

      const installItems = installRes.data.map((it: InstallRequest) => ({
        id: it.installId,
        type: "설치문의",
        date: it.requestDate,
        status: it.installStatus,
      }));
      const serviceItems = serviceRes.data.map((it: ServiceRequest) => ({
        id: it.asId,
        type: "A/S 신청",
        date: it.asStartTime,
        status: it.asStatus,
      }));
      const cleanItems = cleanRes.data.map((it: CleanRequest) => ({
        id: it.cleanId,
        type: "세척 문의",
        date: it.requestDate ?? it.cleanStartTime,
        status: it.cleanStatus,
      }));

      setItems([...installItems, ...serviceItems, ...cleanItems]);
    } catch (err) {
      console.error("신청 목록 조회 오류:", err);
      setError("신청 내역을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">신청 내역</h2>
      {error && (
        <div className="text-red-500 bg-red-50 border border-red-200 rounded p-2 mb-2">
          {error}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded min-w-[520px] text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">번호</th>
              <th className="py-2 px-4">종류</th>
              <th className="py-2 px-4">신청일</th>
              <th className="py-2 px-4">상태</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{item.type}</td>
                <td className="py-2 px-4">
                  {item.date ? new Date(item.date).toLocaleDateString("ko-KR") : ""}
                </td>
                <td className="py-2 px-4">{getInstallStatusText(item.status)}</td>
              </tr>
            ))}
            {items.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="py-3">신청 내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}