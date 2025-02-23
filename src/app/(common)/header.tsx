import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-end items-center">
        <nav className="space-x-4">          
          <Link href="/login" className="hover:text-blue-400">로그인</Link>
          <Link href="/join" className="hover:text-blue-400">회원가입</Link>
          <Link href="/mypage" className="hover:text-blue-400">마이페이지</Link>
          <Link href="/admin" className="hover:text-blue-400">관리자</Link>
        </nav>
      </div>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="font-bold text-xl">LOGO</span>
        </Link>
        <nav className="space-x-4">
          <Link href="/about" className="hover:text-blue-500">회사소개</Link>
          <Link href="/used-ac" className="hover:text-blue-500">중고에어컨</Link>
          <Link href="/cleaning" className="hover:text-blue-500">에어컨세척</Link>
          <Link href="/estimate" className="hover:text-blue-500">견적 신청</Link>
          <Link href="/notice" className="hover:text-blue-500">공지사항</Link>
          <Link href="/service" className="hover:text-blue-500">AS문의</Link>
        </nav>
      </div>
    </header>
  );
}
