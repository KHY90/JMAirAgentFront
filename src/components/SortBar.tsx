"use client";
import React from "react";

interface SortBarProps {
  onSort: (sortOrder: "desc" | "asc") => void;
}

export default function SortBar({ onSort }: SortBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "desc" | "asc";
    onSort(value);
  };

  return (
    <div className="mb-4">
      <select
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
        defaultValue="desc"
      >
        <option value="desc">최신순</option>
        <option value="asc">오래된 순</option>
      </select>
    </div>
  );
}
