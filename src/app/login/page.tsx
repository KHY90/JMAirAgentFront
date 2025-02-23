"use client";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* 로그인 제목 */}
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

        {/* 아이디 & 비밀번호 입력 */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="아이디"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">
            로그인
          </button>
        </form>

        {/* 소셜 로그인 버튼 */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">소셜 로그인</p>
          <div className="flex space-x-2 mt-2">
            <button className="w-1/2 bg-yellow-400 rounded-md text-black hover:bg-yellow-500 flex items-center justify-center h-12 relative overflow-hidden">
              <Image
                src="/images/login/kakao_login_medium_narrow.png"
                alt="Kakao"
                fill
                className="object-cover"
              />
            </button>
            <button className="w-1/2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center h-12 relative overflow-hidden">
              <Image
                src="/images/login/naver_mi.png"
                alt="Naver"
                fill
                className="object-cover"
              />
            </button>
          </div>
        </div>

        {/* 회원가입 링크 */}
        <p className="mt-4 text-center text-gray-600">
          계정이 없으신가요?{" "}
          <Link href="/join" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
