"use client";
import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import withAdminAuth from "@/hoc/withAdminAuth";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-4 md:p-6">
        {children}
      </div>
    </div>
  );
}

export default withAdminAuth(AdminLayout);
