import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR 코드 생성기 | QRmaker",
  description: "URL을 입력하면 즉시 QR 코드를 생성합니다. 색상, 로고 커스터마이징 및 PNG/SVG 다운로드 지원.",
  keywords: ["QR코드", "QR생성기", "QR코드만들기", "qrcode generator"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geist.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
