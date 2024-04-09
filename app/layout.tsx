import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import QueryProvider from "./Provider";
import Footer from "./_components/layout/Footer";
import Header from "./_components/layout/Header";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Green-Action",
  description: "The fastest way to build apps with Next.js and Supabase",
};

declare global {
  interface Window {
    Kakao: any;
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
      <body className="bg-background text-foreground">
        <QueryProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </QueryProvider>
      </body>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
