"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

export default function AdminPage() {
  const { data, isLoading } = useAdminDashboard();
  const estimateData = data?.estimates ?? [];
  const memberData = data?.members ?? [];
  const noticeData = data?.notices ?? [];
  const memberStats = data?.memberStats ?? [];
  const noticeStats = data?.noticeStats ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>

        {/* 상단 카드 영역 (2열 그리드) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* 견적 신청 관리 카드 */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-3">견적 신청 관리</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-2 w-32">날짜</th>
                    <th className="py-2 px-2">제목</th>
                    <th className="py-2 px-2 w-20">상태</th>
                    <th className="py-2 px-2 w-24">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {estimateData.length > 0 ? (
                    estimateData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2 text-sm">{item.date}</td>
                        <td className="py-2 px-2 text-sm">{item.title}</td>
                        <td className="py-2 px-2 text-sm">{item.status}</td>
                        <td className="py-2 px-2">
                          <button className="text-blue-500 mr-2">수정</button>
                          <button className="text-red-500">삭제</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-gray-500">
                        데이터가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 회원 관리 카드 */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-3">회원 관리</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-2 w-32">회원명</th>
                    <th className="py-2 px-2">이메일</th>
                    <th className="py-2 px-2 w-32">가입일</th>
                    <th className="py-2 px-2 w-24">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {memberData.length > 0 ? (
                    memberData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2 text-sm">{item.userName}</td>
                        <td className="py-2 px-2 text-sm">{item.email}</td>
                        <td className="py-2 px-2 text-sm">{item.joined}</td>
                        <td className="py-2 px-2">
                          <button className="text-blue-500 mr-2">수정</button>
                          <button className="text-red-500">삭제</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-gray-500">
                        데이터가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 공지사항 관리 카드 */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-3">공지사항 관리</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-2">제목</th>
                    <th className="py-2 px-2 w-32">작성일</th>
                    <th className="py-2 px-2 w-20">조회수</th>
                    <th className="py-2 px-2 w-24">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {noticeData.length > 0 ? (
                    noticeData.map((notice) => (
                      <tr key={notice.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2 text-sm">{notice.title}</td>
                        <td className="py-2 px-2 text-sm">{notice.date}</td>
                        <td className="py-2 px-2 text-sm">{notice.views}</td>
                        <td className="py-2 px-2">
                          <button className="text-blue-500 mr-2">수정</button>
                          <button className="text-red-500">삭제</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-gray-500">
                        데이터가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 통계 카드 */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-3">통계</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-60">
                <p className="text-center mb-2 font-semibold">회원 통계</p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={memberStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3182ce" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-60">
                <p className="text-center mb-2 font-semibold">게시글 통계</p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={noticeStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#38a169" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
