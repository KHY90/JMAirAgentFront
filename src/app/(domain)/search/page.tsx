"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ApplicationItem {
  id: number;
  type: "견적" | "세척" | "A/S";
  title: string;
  requestDate: string;
  status: string;
}

export default function ApplicationHistoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const [installRes, cleaningRes, asRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/install/search`, {
          params: { name, phone },
          withCredentials: true,
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cleaning/search`, {
          params: { name, phone },
          withCredentials: true,
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/as/search`, {
          params: { name, phone },
          withCredentials: true,
        }),
      ]);

      const installApps = installRes.data.map((item: any) => ({ ...item, type: "견적" as const }));
      const cleaningApps = cleaningRes.data.map((item: any) => ({ ...item, type: "세척" as const }));
      const asApps = asRes.data.map((item: any) => ({ ...item, type: "A/S" as const }));

      const allApps = [...installApps, ...cleaningApps, ...asApps];
      setApplications(allApps);
    } catch (err) {
      console.error(err);
      setError("신청 내역을 불러오는데 실패했습니다.");
    }
  };

  const handleItemClick = (item: ApplicationItem) => {
    // 각 신청의 상세 페이지 경로는 type에 따라 다르게 구성합니다.
    // 예를 들어, 견적 신청은 /search/estimate/{id}, 세척 신청은 /search/cleaning/{id}, A/S 신청은 /search/as/{id}
    let path = "";
    switch (item.type) {
      case "견적":
        path = `/search/estimate/${item.id}`;
        break;
      case "세척":
        path = `/search/cleaning/${item.id}`;
        break;
      case "A/S":
        path = `/search/as/${item.id}`;
        break;
    }
    router.push(path);
  };

  return (
    <div className="container mx-auto p-6 font-gowun">
      <h1 className="text-2xl font-bold mb-4">신청 내역 조회</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="핸드폰 번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
            조회
          </button>
        </div>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">번호</th>
            <th className="py-2 px-4">신청 종류</th>
            <th className="py-2 px-4">제목</th>
            <th className="py-2 px-4">신청일</th>
            <th className="py-2 px-4">상태</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((item, index) => (
            <tr key={item.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleItemClick(item)}>
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{item.type}</td>
              <td className="py-2 px-4">{item.title}</td>
              <td className="py-2 px-4">{item.requestDate}</td>
              <td className="py-2 px-4">{item.status}</td>
            </tr>
          ))}
          {applications.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4">
                조회된 신청 내역이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
