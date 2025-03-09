"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* 사이드바 */}
      <aside className="w-64 bg-white p-6 mt-2">
        <h2 className="text-2xl font-bold mb-6 font-gowun">신청 메뉴</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            href="/register/install"
            className={`block px-4 py-2 rounded hover:bg-primary hover:text-white font-gowun ${pathname === "/register/estimate" ? "bg-primary text-white" : "text-black"}`}
          >
            견적 신청
          </Link>
          <Link
            href="/register/cleaning"
            className={`block px-4 py-2 rounded hover:bg-primary hover:text-white font-gowun ${pathname === "/register/cleaning" ? "bg-primary text-white" : "text-black"}`}
          >
            세척 신청
          </Link>
          <Link
            href="/register/service"
            className={`block px-4 py-2 rounded hover:bg-primary hover:text-white font-gowun ${pathname === "/register/service" ? "bg-primary text-white" : "text-black"}`}
          >
            A/s 신청
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
