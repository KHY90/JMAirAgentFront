"use client";
import { useState } from "react";

export default function JoinPage() {
  // 상태 관리 (입력 필드)
  const [formData, setFormData] = useState({
    userLogin: "",
    userName: "",
    password: "",
    phoneNumber: "",
    email: "",
  });

  // 에러 메시지 상태 관리
  const [errors, setErrors] = useState({
    userLogin: "",
    userName: "",
    password: "",
  });

  // API 응답 메시지 상태
  const [apiMessage, setApiMessage] = useState("");

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 회원가입 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 입력값 확인
    const newErrors = { userLogin: "", userName: "", password: "" };
    if (!formData.userLogin) newErrors.userLogin = "ID는 필수입니다.";
    if (!formData.userName) newErrors.userName = "이름은 필수입니다.";
    if (!formData.password) newErrors.password = "비밀번호는 필수입니다.";

    setErrors(newErrors);

    // 에러가 없으면 서버로 데이터 전송
    if (!newErrors.userLogin && !newErrors.userName && !newErrors.password) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/join`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("회원가입 실패");
        }

        const data = await response.json();
        console.log("회원가입 응답 데이터:", data);
        setApiMessage(data.message || "회원가입이 완료되었습니다!");
      } catch (error) {
        console.error("회원가입 오류:", error);
        setApiMessage("회원가입에 실패했습니다.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* 회원가입 제목 */}
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 아이디 입력 */}
          <div>
            <input
              type="text"
              name="userLogin"
              placeholder="아이디는 영문자로 시작하는 4~16자 영문자 또는 숫자입니다."
              value={formData.userLogin}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.userLogin && <p className="text-red-500 text-sm mt-1">{errors.userLogin}</p>}
          </div>

          {/* 이름 입력 */}
          <div>
            <input
              type="text"
              name="userName"
              placeholder="이름"
              value={formData.userName}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* 전화번호 입력 */}
          <input
            type="text"
            name="phoneNumber"
            placeholder="전화번호 (선택)"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 이메일 입력 */}
          <input
            type="email"
            name="email"
            placeholder="이메일 (선택)"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
          >
            회원가입
          </button>
        </form>

        {/* API 응답 메시지 출력 */}
        {apiMessage && <p className="mt-4 text-center text-green-500">{apiMessage}</p>}

        {/* 로그인 페이지 이동 링크 */}
        <p className="mt-4 text-center text-gray-600">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
