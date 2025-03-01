"use client";
import React, { useState } from "react";

export default function EstimatePostPage() {
  // 실제로는 useState 등을 활용해 입력값을 관리하거나, onSubmit에서 처리할 수 있음.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("견적 신청이 완료되었습니다! (예시)");
  };

  // 핸드폰 필드 상태
  const [mobileArea, setMobileArea] = useState("010");
  const [mobileCustom, setMobileCustom] = useState(false); // '직접입력' 선택 여부
  const [phoneArea, setPhoneArea] = useState("02");
  const [phoneCustom, setPhoneCustom] = useState(false); // '직접입력' 선택 여부

  // 핸드폰 앞자리 변경
  const handleMobileAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "custom") {
      setMobileCustom(true);
      setMobileArea("");
    } else {
      setMobileCustom(false);
      setMobileArea(e.target.value);
    }
  };

  // 연락처(집/사무실) 앞자리 변경
  const handlePhoneAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "custom") {
      setPhoneCustom(true);
      setPhoneArea("");
    } else {
      setPhoneCustom(false);
      setPhoneArea(e.target.value);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold mb-6">견적 신청 글쓰기</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl border border-gray-300 rounded-md p-6"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* 이름 */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="name">
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* 핸드폰 */}
          <div>
            <label className="block mb-1 font-medium">핸드폰</label>
            <div className="flex space-x-2">
              {/* 핸드폰 앞자리 선택 or 직접입력 */}
              {mobileCustom ? (
                <input
                  type="text"
                  placeholder="직접입력"
                  value={mobileArea}
                  onChange={(e) => setMobileArea(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-2 w-24"
                />
              ) : (
                <select
                  value={mobileArea}
                  onChange={handleMobileAreaChange}
                  className="border border-gray-300 rounded px-2 py-2 w-24"
                >
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="018">018</option>
                  <option value="019">019</option>
                  <option value="custom">직접입력</option>
                </select>
              )}

              <input
                type="text"
                placeholder="0000-0000"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <label className="block mb-1 font-medium">연락처</label>
            <div className="flex space-x-2">
              {/* 연락처 앞자리 선택 or 직접입력 */}
              {phoneCustom ? (
                <input
                  type="text"
                  placeholder="직접입력"
                  value={phoneArea}
                  onChange={(e) => setPhoneArea(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-2 w-24"
                />
              ) : (
                <select
                  value={phoneArea}
                  onChange={handlePhoneAreaChange}
                  className="border border-gray-300 rounded px-2 py-2 w-24"
                >
                  <option value="02">02</option>
                  <option value="031">031</option>
                  <option value="custom">직접입력</option>
                </select>
              )}
              <input
                type="text"
                placeholder="0000-0000"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          {/* 주소 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium">주소</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="기본주소"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
              <button
                type="button"
                className="border border-gray-300 rounded px-3 py-2 bg-gray-100 hover:bg-gray-200"
              >
                주소 검색
              </button>
            </div>
            <input
              type="text"
              placeholder="상세주소"
              className="w-full mt-2 border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* 이메일 */}
          <div>
            <label className="block mb-1 font-medium">이메일</label>
            <input
              type="email"
              placeholder="example@example.com"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* 제조사/선택 */}
          <div>
            <label className="block mb-1 font-medium">제조사/선택</label>
            <select className="w-full border border-gray-300 rounded px-2 py-2">
              <option>삼성전자</option>
              <option>LG전자</option>
              <option>캐리어</option>
              <option>위니아</option>
              <option>대우</option>
              <option>하이얼</option>
              <option>센츄리</option>
              <option>기타</option>
            </select>
          </div>

          {/* 에어컨 종류 */}
          <div>
            <label className="block mb-1 font-medium">에어컨 종류</label>
            <select className="w-full border border-gray-300 rounded px-2 py-2">
              <option>벽걸이</option>
              <option>스탠드</option>
              <option>시스템</option>
              <option>2 in 1 형</option>
              <option>중•대형(영업용)</option>
              <option>냉난방겸용</option>
              <option>멀티형</option>
              <option>온풍기</option>
            </select>
          </div>

          {/* 냉방능력 / 평형 */}
          <div>
            <label className="block mb-1 font-medium">냉방능력 (Kcal/h 또는 W)</label>
            <input
              type="text"
              placeholder="예) 6000"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">평형</label>
            <input
              type="text"
              placeholder="예) 18평형"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* 작업내용 */}
          <div>
            <label className="block mb-1 font-medium">작업내용</label>
            <select className="w-full border border-gray-300 rounded px-2 py-2">
              <option>선택해주세요.</option>
              <option>철거만</option>
              <option>설치만</option>
              <option>이전설치</option>
              <option>앵글설치만</option>
              <option>설치후 앵글설치</option>
              <option>이전설치후 앵글설치</option>
              <option>실내기이동</option>
            </select>
          </div>

          {/* 희망일자(우선순위1) */}
          <div>
            <label className="block mb-1 font-medium">희망일자 (우선순위1)</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* 희망일자(우선순위2) */}
          <div>
            <label className="block mb-1 font-medium">희망일자 (우선순위2)</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* 이전 설치주소 */}
          <div>
            <label className="block mb-1 font-medium">이전 설치주소</label>
            <input
              type="text"
              placeholder="이전 설치 주소를 입력해주세요"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        {/* 작성하기 / 취소 버튼 */}
        <div className="mt-6 flex space-x-4 justify-center">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            작성하기
          </button>
          <button
            type="button"
            className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
