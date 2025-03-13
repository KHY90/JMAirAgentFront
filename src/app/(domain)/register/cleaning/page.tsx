"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CleaningPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    productType: "벽걸이형",
    note: "",
    preferredDate: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cleaning`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("에어컨 세척 신청 결과:", response.data);
      setSuccess("에어컨 세척 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.");

      setFormData({
        name: "",
        phone: "",
        address: "",
        productType: "벽걸이형",
        note: "",
        preferredDate: "",
      });
    } catch (err: unknown) {
      console.error("에어컨 세척 신청 오류:", err);
      setError("에어컨 세척 신청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("신청을 취소하시겠습니까?");
    if (confirmCancel) {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-8 font-gowun">
      <h1 className="text-2xl font-bold mb-6">에어컨 세척 신청</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl border border-gray-300 rounded-md p-6"
      >
        {/* 에러/성공 메시지 */}
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">{success}</div>}

        {/* 이름 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">이름</label>
          <input
            type="text"
            name="name"
            placeholder="이름을 입력하세요"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 연락처 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">연락처</label>
          <input
            type="tel"
            name="phone"
            placeholder="010-0000-0000"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 주소 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">주소</label>
          <input
            type="text"
            name="address"
            placeholder="시/구/동까지 상세하게 입력해주세요"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 제품 종류 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">제품 종류</label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="벽걸이형">벽걸이형</option>
            <option value="스탠드형">스탠드형</option>
            <option value="시스템에어컨">시스템에어컨</option>
            <option value="천장형/카세트형">천장형/카세트형</option>
            <option value="기타">기타</option>
          </select>
        </div>

        {/* 요청사항/특이사항 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">요청사항/특이사항</label>
          <textarea
            name="note"
            placeholder="에어컨 세척 시 주의사항, 특이사항 등을 입력해주세요"
            value={formData.note}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 h-32"
            required
          />
        </div>

        {/* 희망 날짜/시간 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">희망 방문일/시간</label>
          <input
            type="datetime-local"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* 버튼들 */}
        <div className="flex space-x-2 justify-center mt-6">
          <button
            type="submit"
            className="w-[70%] bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-800"
          >
            신청하기
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-[30%] bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-danger"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
