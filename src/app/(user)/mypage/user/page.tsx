"use client";
import { useDeleteAccount } from "@/hooks/useDeleteAcoount";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserInfo {
  userLogin: string;
  userName: string;
  phoneNumber?: string;
  email?: string;
}

export default function MyPageUser() {
  const { deleteAccount, errorMessage, isLoading } = useDeleteAccount();
  const [info, setInfo] = useState<UserInfo | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/current`,
          { withCredentials: true }
        );
        setInfo(res.data.user);
      } catch (err) {
        console.error("사용자 정보 조회 오류:", err);
        setLoadError("사용자 정보를 불러오지 못했습니다.");
      }
    };
    fetchInfo();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">나의 정보</h2>
      <div className="overflow-x-auto">
        {info ? (
          <table className="w-full border border-gray-300 rounded min-w-[320px]">
            <tbody>
              <tr>
                <th className="py-2 px-4 w-32 bg-gray-100 text-left">아이디</th>
                <td className="py-2 px-4">{info.userLogin}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 w-32 bg-gray-100 text-left">이름</th>
                <td className="py-2 px-4">{info.userName}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 w-32 bg-gray-100 text-left">전화번호</th>
                <td className="py-2 px-4">{info.phoneNumber || "-"}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 w-32 bg-gray-100 text-left">이메일</th>
                <td className="py-2 px-4">{info.email || "-"}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>정보를 불러오는 중...</p>
        )}
      </div>
      <button
        onClick={deleteAccount}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        disabled={isLoading}
      >
        {isLoading ? "탈퇴 중..." : "회원 탈퇴"}
      </button>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {loadError && <p className="text-red-500">{loadError}</p>}
    </div>
  );
}