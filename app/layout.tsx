import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import QueryProvider from "./Provider";
import Chatbot from "./_components/layout/Chatbot";
import Footer from "./_components/layout/Footer";
import Header from "./_components/layout/Header";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "soom",
  description:
    "친환경 및 지속가능성 관련 캠페인 정보 제공, 캠페인 모임 생성과 참여, 인증과 공유가 가능한 서비스 플랫폼 사이트",
};
// 여기서 사용자정보 불러오기
declare global {
  interface Window {
    Kakao: any;
  }
}
declare global {
  interface Window {
    kakao: any;
  }
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko" className={GeistSans.className}>
      <body className="text-foreground">
        <QueryProvider>
          <Header />
          <main>
            {children}
            {modal}
            <Chatbot />
          </main>
          <Footer />
        </QueryProvider>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
        <Script
          src={`//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`}
          strategy="afterInteractive"
        />
      </body>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
