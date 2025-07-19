
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
    <aside className="w-64 bg-gray-50 p-6">
      <nav className="space-y-4">
        <h2 className="text-xl font-bold mb-6">마이페이지</h2>
        <ul className="space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block px-4 py-2 rounded-md text-lg ${
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
