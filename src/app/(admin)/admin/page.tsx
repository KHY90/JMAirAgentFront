"use client";
import React from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

export default function AdminPage() {
  const { estimates, services, cleans, members, notices } = useAdminDashboard();

  const estimateData = estimates.data ?? [];
  const serviceData = services.data ?? [];
  const cleanData = cleans.data ?? [];
  const memberData = members.data ?? [];
  const noticeData = notices.data ?? [];

  const allLoading =
    estimates.isLoading &&
    services.isLoading &&
    cleans.isLoading &&
    members.isLoading &&
    notices.isLoading;

  if (allLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex-1 p-4 md:p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>

        {/* 견적 신청 테이블 */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-3">견적 신청 관리</h2>
          {estimates.isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-2 w-32">날짜</th>
                    <th className="py-2 px-2">제목</th>
                    <th className="py-2 px-2 w-20">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {estimateData.length > 0 ? (
                    estimateData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2 text-sm">{item.date}</td>
                        <td className="py-2 px-2 text-sm">{item.title}</td>
                        <td className="py-2 px-2 text-sm">{item.status}</td>
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

        {/* A/S 신청 테이블 */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-3">A/S 신청 관리</h2>
          {services.isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-2 w-32">날짜</th>
                    <th className="py-2 px-2">제목</th>
                    <th className="py-2 px-2 w-20">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceData.length > 0 ? (
                    serviceData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2 text-sm">{item.date}</td>
                        <td className="py-2 px-2 text-sm">{item.title}</td>
                        <td className="py-2 px-2 text-sm">{item.status}</td>
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

        {/* 세척 신청 테이블 */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-3">세척 신청 관리</h2>
          {cleans.isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-2 w-32">날짜</th>
                    <th className="py-2 px-2">제목</th>
                    <th className="py-2 px-2 w-20">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {cleanData.length > 0 ? (
                    cleanData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2 text-sm">{item.date}</td>
                        <td className="py-2 px-2 text-sm">{item.title}</td>
                        <td className="py-2 px-2 text-sm">{item.status}</td>
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

        {/* 회원 관리 테이블 */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-3">회원 관리</h2>
          {members.isLoading ? (
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
                  {memberData.length > 0 ? (
                    memberData.map((item) => (
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

        {/* 공지사항 테이블 */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-3">공지사항 관리</h2>
          {notices.isLoading ? (
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
                  {noticeData.length > 0 ? (
                    noticeData.map((notice) => (
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
      </div>
    </div>
  );
}
