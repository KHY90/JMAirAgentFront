
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
  { name: '나의 정보', href: '/mypage' },
  { name: '신청 내역', href: '/mypage/requests' },
  { name: '설치기사 신청', href: '/mypage/engineer' },
];

export default function MyPageSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-gray-50 p-4 md:p-6">
      <nav className="space-y-4">
        <h2 className="text-xl font-bold mb-6 hidden md:block">마이페이지</h2>
        <ul className="flex flex-row md:flex-col justify-around md:justify-start space-x-2 md:space-x-0 md:space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} className="flex-1 md:flex-none">
                <Link
                  href={link.href}
                  className={`block px-2 py-2 md:px-4 text-center md:text-left rounded-md text-sm sm:text-base md:text-lg ${
                    isActive
                      ? 'bg-blue-500 text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
