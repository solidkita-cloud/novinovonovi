// src/app/layout.tsx
import type { Metadata } from 'next';
import { Fredoka, Nunito, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BIRTHDAY.exe — Bunda Novi Edition 🎂',
  description: 'Pesta Ulang Tahun Digital Kolektif dari Teman-Teman Kantor untuk Bunda Novi tersayang. Bunda Bahagia, Semua Bahagia! 💜',
  keywords: ['Bunda Novi', 'Birthday', 'Ulang Tahun', 'Teman Kantor', 'Floppy', 'Ungu Band'],
  openGraph: {
    title: 'BIRTHDAY.exe — Bunda Novi Edition 🎂',
    description: 'Bunda Novi Bahagia, Semua Bahagia! WKWKWK! 💜',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${fredoka.variable} ${nunito.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FFF4E8] text-[#1E1233] antialiased selection:bg-[#FF4FA3] selection:text-white">
        {children}
      </body>
    </html>
  );
}
