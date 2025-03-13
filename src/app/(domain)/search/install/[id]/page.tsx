"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface InstallDetail {
  id: number;
  title: string;
  description: string;
  requestDate: string;
  status: string;
}

export default function InstallDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const installId = Number(id);
  const [install, setInstall] = useState<InstallDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEstimate = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/install/${installId}`, { withCredentials: true });
        setInstall(response.data);
      } catch (err) {
        console.error("견적 상세 조회 오류:", err);
        setError("견적 상세 정보를 불러오는데 실패했습니다.");
      }
    };
    fetchEstimate();
  }, [installId]);

  const handleBack = () => {
    router.push("/search");
  };

  const handleEdit = () => {
    router.push(`/search/install/${installId}/edit`);
  };

  const handleCancel = async () => {
    if (!window.confirm("신청을 취소하시겠습니까?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/install/${installId}/delete`, { withCredentials: true });
      alert("신청이 취소되었습니다.");
      router.push("/search");
    } catch (err) {
      console.error("신청 취소 오류:", err);
      alert("신청 취소에 실패했습니다.");
    }
  };

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!install) return <div className="p-4">로딩중...</div>;

  return (
    <div className="container mx-auto p-6 font-gowun">
      <h1 className="text-2xl font-bold mb-4">{install.title}</h1>
      <div className="mb-4 text-gray-600">
        <span>신청일: {install.requestDate}</span>
        <span className="mx-4">상태: {install.status}</span>
      </div>
      <div className="border-t border-gray-300 pt-4 mb-4">
        <p className="text-base leading-relaxed">{install.description}</p>
      </div>
      <div className="flex space-x-4">
        <button onClick={handleBack} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
          목록
        </button>
        <button onClick={handleEdit} className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">
          수정
        </button>
        <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          취소
        </button>
      </div>
    </div>
  );
}
