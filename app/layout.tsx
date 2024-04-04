import { GeistSans } from "geist/font/sans";
import QueryProvider from "./Provider";
import "./globals.css";
import Header from "./_components/Header";
import Script from "next/script";

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
        </QueryProvider>
      </body>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
