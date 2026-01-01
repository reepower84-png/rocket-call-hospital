import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "로켓콜 | 병원 약속콜 전문 TM 서비스",
  description: "확정된 고객만 연결해드립니다. 98% 약속 성사율, 병원 맞춤 TM 전문 서비스 로켓콜",
  keywords: "병원 마케팅, 고객 유치, TM 서비스, 약속콜, 병원 고객 유치, 의료 마케팅",
  openGraph: {
    title: "로켓콜 | 병원 약속콜 전문 TM 서비스",
    description: "확정된 고객만 연결해드립니다. 98% 약속 성사율의 병원 맞춤 TM 전문 서비스",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
