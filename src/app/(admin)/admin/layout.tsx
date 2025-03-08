import React from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "진명에어컨 관리자",
    description: "진명에어컨 관리자 페이지",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <AdminSidebar />

            <div className="flex-1 p-4 md:p-6">
                {children}
            </div>
        </div>
    );
}
