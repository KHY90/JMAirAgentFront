import type { Metadata } from "next";
import "./styles/globals.css";
import AuthUpdater from "../components/AuthUpdater";
import ReactQueryProvider from "../components/ReactQueryProvider";
import Header from "./(common)/header";
import Footer from "./(common)/footer";
import Script from "next/script";
import Chatbot from "../components/ChatBotWidget";

export const metadata: Metadata = {
  title: "진명에어컨 에이전트",
  description: "진명에어컨 에이전트 홈페이지",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* GA4 Global Site Tag */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-CPZ5VQJXH8`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CPZ5VQJXH8', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* 주소 검색용 스크립트 */}
        <Script
          src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <ReactQueryProvider>
          <AuthUpdater />
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <Chatbot />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
