"use client";
import Link from "next/link";
import React from "react";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen hidden md:flex flex-col">
      {/* 로고 영역 */}
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        관리자페이지
      </div>
      {/* 메뉴 영역 */}
      <nav className="mt-4 flex-1">
        <Link href="/admin/estimate" className="block px-4 py-2 hover:bg-gray-700">
          견적 신청 관리
        </Link>
        <Link href="/admin/as" className="block px-4 py-2 hover:bg-gray-700">
          A/S 신청 관리
        </Link>
        <Link href="/admin/sms" className="block px-4 py-2 hover:bg-gray-700">
          SMS 신청 관리
        </Link>
        <Link href="/admin/used" className="block px-4 py-2 hover:bg-gray-700">
          중고에어컨 신청 관리
        </Link>
        <Link href="/admin/member" className="block px-4 py-2 hover:bg-gray-700">
          회원 관리
        </Link>
        <Link href="/admin/notice" className="block px-4 py-2 hover:bg-gray-700">
          공지사항 관리
        </Link>
      </nav>
    </div>
  );
}
