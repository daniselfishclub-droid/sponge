import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sponge Club — AI를 냅다 흡수해서, 비즈니스에 냅다 꽂아 넣는 사람들",
  description: "무언가를 팔기 위해 고민하는 마케터, 비즈니스 실무자를 위한 AI 커뮤니티. 8주간 AI를 흡수하고, 만들고, 세상에 내놓는 풀 사이클을 경험합니다.",
  openGraph: {
    title: "Sponge Club — AI 마케팅 커뮤니티",
    description: "냅다 흡수하고 · 냅다 만들고 · 냅다 세상에 내놓는다",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-sponge-bg text-sponge-text antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
