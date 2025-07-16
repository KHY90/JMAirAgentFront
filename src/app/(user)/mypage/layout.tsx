
import MyPageSidebar from '@/components/MyPageSidebar';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-100px)]">
      <MyPageSidebar />
      <main className="flex-1 p-6 bg-white">
        {children}
      </main>
    </div>
  );
}
