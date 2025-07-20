"use client";
import LoadingSpinner from "../LoadingSpinner";
import { NoticeItem } from "../../hooks/useAdminDashboard";

interface Props {
  data: NoticeItem[];
  isLoading: boolean;
}

export default function NoticeTable({ data, isLoading }: Props) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-3">공지사항 관리</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="py-2 px-2">제목</th>
                <th className="py-2 px-2 w-32">작성일</th>
                <th className="py-2 px-2 w-20">조회수</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((notice) => (
                  <tr key={notice.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2 text-sm">{notice.title}</td>
                    <td className="py-2 px-2 text-sm">{notice.date}</td>
                    <td className="py-2 px-2 text-sm">{notice.views}</td>
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
