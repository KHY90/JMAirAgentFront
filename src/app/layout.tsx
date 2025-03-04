import type { Metadata } from "next";
import "./styles/globals.css"; 
import AuthUpdater from "./components/AuthUpdater";

import Header from "./(common)/header";
import Footer from "./(common)/footer";

export const metadata: Metadata = {
  title: "진명에어컨",
  description: "진명에어컨 홈페이지",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
      <AuthUpdater />
        <Header /> 
        <main className="flex-1 w-full">{children}</main>
        <Footer /> 
      </body>
    </html>
  );
}
