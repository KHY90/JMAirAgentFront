"use client";
import React from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import StatsChart from "@/components/adminDashboard/StatsChart";
import EstimateTable from "@/components/adminDashboard/EstimateTable";
import ServiceTable from "@/components/adminDashboard/ServiceTable";
import CleanTable from "@/components/adminDashboard/CleanTable";
import MemberTable from "@/components/adminDashboard/MemberTable";
import NoticeTable from "@/components/adminDashboard/NoticeTable";

export default function AdminPage() {
  const { estimates, services, cleans, members, notices } = useAdminDashboard();

  const estimateData = estimates.data ?? [];
  const serviceData = services.data ?? [];
  const cleanData = cleans.data ?? [];
  const memberData = members.data ?? [];
  const noticeData = notices.data ?? [];

  const chartData = [
    { name: "견적", count: estimateData.length },
    { name: "A/S", count: serviceData.length },
    { name: "세척", count: cleanData.length },
    { name: "회원", count: memberData.length },
    { name: "공지", count: noticeData.length },
  ];

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
        <StatsChart data={chartData} />
        <EstimateTable data={estimateData} isLoading={estimates.isLoading} />
        <ServiceTable data={serviceData} isLoading={services.isLoading} />
        <CleanTable data={cleanData} isLoading={cleans.isLoading} />
        <MemberTable data={memberData} isLoading={members.isLoading} />
        <NoticeTable data={noticeData} isLoading={notices.isLoading} />
      </div>
    </div>
  );
}
