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
  description: "The fastest way to build apps with Next.js and Supabase",
};

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
  //bg-background
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
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer,drawing`}
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
