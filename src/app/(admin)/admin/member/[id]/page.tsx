"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { getGradeText } from "@/utils/transform";
import LoadingSpinner from "@/components/LoadingSpinner";

interface MemberDetail {
  userLogin: string;
  userName: string;
  email?: string;
  phoneNumber?: string;
  joinDate: string;
  userGrade: string;
  status: boolean;
}

export default function AdminMemberDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [detail, setDetail] = useState<MemberDetail | null>(null);
  const [error, setError] = useState("");
  const [grade, setGrade] = useState("");

  const fetchDetail = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${id}`,
        { withCredentials: true }
      );
      setDetail(res.data);
      setGrade(res.data.userGrade || "");
    } catch (err) {
      console.error("회원 상세 조회 오류:", err);
      setError("회원 정보를 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  const updateGrade = async () => {
    if (!window.confirm("등급을 수정하시겠습니까?")) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${id}/grade`,
        { userGrade: grade },
        { withCredentials: true }
      );
      alert("등급이 수정되었습니다.");
      fetchDetail();
    } catch (err) {
      console.error("등급 수정 오류:", err);
      alert("등급 수정에 실패했습니다.");
    }
  };

  const acceptEngineer = async () => {
    if (!window.confirm("엔지니어 신청을 승인하시겠습니까?")) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${id}/grade`,
        { userGrade: "ENGINEER" },
        { withCredentials: true }
      );
      alert("승인되었습니다.");
      fetchDetail();
    } catch (err) {
      console.error("신청 승인 오류:", err);
      alert("승인에 실패했습니다.");
    }
  };

  const forceDelete = async () => {
    if (!window.confirm("정말로 탈퇴시키겠습니까?")) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/delete`,
        null,
        { params: { userLogin: id }, withCredentials: true }
      );
      alert("탈퇴되었습니다.");
      router.push("/admin/member");
    } catch (err) {
      console.error("회원 탈퇴 오류:", err);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!detail) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white text-black px-6 py-8 font-gowun">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">회원 상세 정보</h1>
        <table className="w-full border border-gray-300 rounded">
          <tbody>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left w-32">아이디</th>
              <td className="px-4 py-2">{detail.userLogin}</td>
            </tr>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left">이름</th>
              <td className="px-4 py-2">{detail.userName}</td>
            </tr>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left">이메일</th>
              <td className="px-4 py-2">{detail.email || "-"}</td>
            </tr>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left">전화번호</th>
              <td className="px-4 py-2">{detail.phoneNumber || "-"}</td>
            </tr>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left">가입일</th>
              <td className="px-4 py-2">
                {new Date(detail.joinDate).toLocaleDateString("ko-KR")}
              </td>
            </tr>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left">등급</th>
              <td className="px-4 py-2">{getGradeText(detail.userGrade)}</td>
            </tr>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left">상태</th>
              <td className="px-4 py-2">{detail.status ? "활성" : "비활성"}</td>
            </tr>
          </tbody>
        </table>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="grade" className="font-semibold">
              등급 수정:
            </label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded"
            >
              <option value="USER">일반회원</option>
              <option value="ENGINEER">설치기사</option>
              <option value="WAITING">대기중</option>
              <option value="ADMIN">관리자</option>
              <option value="SUPERADMIN">최고관리자</option>
              <option value="ADMINWATCHER">임시관리자</option>
            </select>
            <button
              onClick={updateGrade}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              수정
            </button>
          </div>

          {detail.userGrade === "WAITING" && (
            <button
              onClick={acceptEngineer}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              엔지니어 신청 승인
            </button>
          )}

          <button
            onClick={forceDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            강제 탈퇴
          </button>

          <button
            onClick={() => router.back()}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            목록
          </button>
        </div>
      </div>
    </div>
  );
}
