"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Applicant {
  userLogin: string;
  userName: string;
  appliedAt?: string;
}

export default function EngineerWaitingPage() {
  const [data, setData] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/engineer/waiting`,
          { withCredentials: true }
        );
        setData(res.data);
      } catch (err) {
        console.error("대기자 목록 조회 오류:", err);
        setError("대기자 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const displayed = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">엔지니어 신청 대기자</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">아이디</th>
              <th className="py-2 px-4">이름</th>
              <th className="py-2 px-4">신청일</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((item) => (
              <tr key={item.userLogin} className="border-b">
                <td className="py-2 px-4">{item.userLogin}</td>
                <td className="py-2 px-4">{item.userName}</td>
                <td className="py-2 px-4">
                  {item.appliedAt ? new Date(item.appliedAt).toLocaleDateString("ko-KR") : ""}
                </td>
              </tr>
            ))}
            {displayed.length === 0 && (
              <tr>
                <td colSpan={3} className="py-3">
                  대기자가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
