"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAddressSearch } from "@/utils/useAddressSearch";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";

export default function ServicePage() {
  const router = useRouter();
  const { address, searchAddress, setAddress } = useAddressSearch();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    detailAddress: "",
    productType: "벽걸이형",
    description: "",
    preferredDate: "",
    reservationFirstDate: "",
    reservationSecondDate: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");

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

    const payload = {
      serviceName: formData.name,
      servicePhone: formData.phone,
      serviceEmail: formData.email,
      serviceAddress: address,
      serviceDetailAddress: formData.detailAddress,
      serviceDescription: formData.description,
      servicePassword: password,
      reservationFirstDate: formData.reservationFirstDate,
      reservationSecondDate: formData.reservationSecondDate,
      preferredDate: formData.preferredDate,
      productType: formData.productType,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/post`,
        payload,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      alert("A/S 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.");

      setFormData({
        name: "",
        phone: "",
        email: "",
        detailAddress: "",
        productType: "벽걸이형",
        description: "",
        preferredDate: "",
        reservationFirstDate: "",
        reservationSecondDate: "",
      });
      setAddress("");
      setPassword("");
    } catch (err: unknown) {
      console.error("A/S 신청 오류:", err);
      setError("A/S 신청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("신청을 취소하시겠습니까?")) {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-8 font-gowun">
      <h1 className="text-2xl font-bold mb-6">A/S 신청</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl border border-gray-300 rounded-md p-6"
      >
        {/* 에러/성공 메시지 */}
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">{success}</div>}

        {/* 이름 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="name">
            이름
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="이름을 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* 연락처 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="phone">
            연락처
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="010-0000-0000"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* 이메일 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="email">
            이메일
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@example.com"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* 주소 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">주소</label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="address"
              placeholder="기본주소"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={searchAddress}
              className="border border-gray-300 rounded px-3 py-2 bg-gray-100 hover:bg-gray-200"
            >
              주소 검색
            </button>
          </div>
          <input
            type="text"
            name="detailAddress"
            placeholder="상세주소"
            className="w-full mt-2 border border-gray-300 rounded px-3 py-2"
            value={formData.detailAddress}
            onChange={handleChange}
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
            <option value="벽걸이">벽걸이</option>
            <option value="스탠드">스탠드</option>
            <option value="시스템">시스템</option>
            <option value="기타">기타</option>
          </select>
        </div>

        {/* 1차 희망 날짜 및 시간 */}
        <CustomDateTimePicker
          label="1차 희망 날짜 및 시간"
          value={formData.reservationFirstDate}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, reservationFirstDate: value }))
          }
        />

        {/* 2차 희망 날짜 및 시간 */}
        <CustomDateTimePicker
          label="2차 희망 날짜 및 시간"
          value={formData.reservationSecondDate}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, reservationSecondDate: value }))
          }
        />

        {/* 요청사항 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            요청사항 (최대 1000자)
          </label>
          <textarea
            name="description"
            placeholder={`A/S 신청 시 요청하시는 사항을 기입해주세요.`}
            className="w-full border border-gray-300 rounded px-3 py-2 h-40 overflow-y-auto"
            maxLength={1000}
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="password">
            비밀번호 (4자리 숫자)
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={4}
            minLength={4}
            pattern="\d{4}"
            required
          />
        </div>

        {/* 작성하기 / 취소 버튼 */}
        <div className="flex space-x-2 justify-center mt-6">
          <button
            type="submit"
            className="w-[70%] bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-800"
          >
            작성하기
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-[30%] bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
