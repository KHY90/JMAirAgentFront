"use client";
import React from "react";

export default function InstallationCostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 border-t-4 border-sky-600">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">설치 비용 안내</h1>
        </div>
      </header>
      {children}
    </div>
  );
}