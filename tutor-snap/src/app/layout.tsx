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
  title: "TutorSnap - Platforma dla korepetytorów",
  description: "Kompleksowa platforma do zarządzania korepetycjami. Zarządzaj uczniami, materiałami, kalendarzem i płatnościami w jednym miejscu.",
  icons: {
    icon: '/brainIcon.svg',
    shortcut: '/brainIcon.svg',
    apple: '/brainIcon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
