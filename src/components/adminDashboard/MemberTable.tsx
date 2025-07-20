"use client";
import LoadingSpinner from "../LoadingSpinner";
import { MemberItem } from "../../hooks/useAdminDashboard";

interface Props {
  data: MemberItem[];
  isLoading: boolean;
}

export default function MemberTable({ data, isLoading }: Props) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-3">회원 관리</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="py-2 px-2 w-32">회원명</th>
                <th className="py-2 px-2">이메일</th>
                <th className="py-2 px-2 w-32">가입일</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2 text-sm">{item.userName}</td>
                    <td className="py-2 px-2 text-sm">{item.email}</td>
                    <td className="py-2 px-2 text-sm">{item.joined}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-500">
                    데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
