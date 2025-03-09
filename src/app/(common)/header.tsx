"use client";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useLogout } from "@/utils/useLogout";
import authStore from "@/utils/authStore";

const Header = observer(() => {
  const logout = useLogout();

  const handleLogout = () => {
    const confirmLogout = window.confirm("정말 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="py-2 px-6 bg-gray-100">
        <div className="container mx-auto flex justify-end items-center space-x-4">
          {authStore.isAuthenticated && authStore.user ? (
            <>
              <span className="text-gray-700">{authStore.user.userName}님, 환영합니다!</span>
              <Link href="/mypage" className="hover:text-blue-400">마이페이지</Link>
              <Link href="/admin" className="hover:text-blue-400">관리자</Link>
              <button onClick={handleLogout} className="hover:text-red-400">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400">로그인</Link>
              <Link href="/join" className="hover:text-blue-400">회원가입</Link>
              <Link href="/mypage" className="hover:text-blue-400">마이페이지</Link>
            </>
          )}
        </div>
      </div>

      <div className="py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* 로고 */}
          <Link href="/">
            <span className="font-bold text-xl">진명에어컨</span>
          </Link>

          {/* 내비게이션 메뉴 */}
          <nav className="space-x-4">
            <Link href="/about" className="hover:text-blue-500">회사소개</Link>
            <Link href="/cost" className="hover:text-blue-500">설치가격</Link>
            <Link href="/used-ac" className="hover:text-blue-500">중고에어컨</Link>
            <Link href="/cleaning" className="hover:text-blue-500">에어컨세척</Link>
            <Link href="/estimate" className="hover:text-blue-500">견적 신청</Link>
            <Link href="/notice" className="hover:text-blue-500">공지사항</Link>
            <Link href="/service" className="hover:text-blue-500">AS문의</Link>
          </nav>
        </div>
      </div>
    </header>
  );
});

export default Header;
