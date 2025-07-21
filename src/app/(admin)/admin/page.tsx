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
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 md:p-6 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">관리자 대시보드</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-1 lg:col-span-2">
            <StatsChart data={chartData} />
          </div>
          <EstimateTable data={estimateData} isLoading={estimates.isLoading} />
          <ServiceTable data={serviceData} isLoading={services.isLoading} />
          <CleanTable data={cleanData} isLoading={cleans.isLoading} />
          <MemberTable data={memberData} isLoading={members.isLoading} />
          <div className="lg:col-span-2">
            <NoticeTable data={noticeData} isLoading={notices.isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
