import { GeistSans } from "geist/font/sans";
import "./globals.css";
import QueryProvider from "./Provider";
import ProviderNextUi from "./Provier-NextUi";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Green-Action",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main>
          <ProviderNextUi>
            <QueryProvider>
              {children}
              {modal}
            </QueryProvider>
          </ProviderNextUi>
        </main>
      </body>
    </html>
  );
}
