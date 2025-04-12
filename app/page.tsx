import CultureCodeList from "@/components/culture-code-list"
import type { Metadata } from 'next'
import Link from 'next/link';


export const metadata: Metadata = {
  title: "Company Culture Code Explorer",
  description:
    "様々な有名企業のカルチャーコードを一覧することができるウェブサイトです。カルチャーコード（Culture Code） は、「その組織らしさ」や「共通の価値観・行動基準」を言語化したもの。",
  openGraph: {
    title: "Company Culture Code Explorer",
    description:
      "様々な有名企業のカルチャーコードを一覧することができるウェブサイトです。カルチャーコード（Culture Code） は、「その組織らしさ」や「共通の価値観・行動基準」を言語化したもの。",
    url: "https://indx-culture-code.vercel.app/",
    siteName: "Company Culture Code Explorer",
    images: [
      {
        url: "https://indx-culture-code.vercel.app/top.png",
        width: 800,
        height: 600,
        alt: "Company Culture Code Explorer",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Company Culture Code Explorer",
    description:
      "様々な有名企業のカルチャーコードを一覧することができるウェブサイトです。カルチャーコード（Culture Code） は、「その組織らしさ」や「共通の価値観・行動基準」を言語化したもの。",
    images: ["https://indx-culture-code.vercel.app/top.png"],
    creator: "Katsuya Ito",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://indx-culture-code.vercel.app/",
  },
}




export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-16 text-center">
          <div className="mx-auto mb-6 inline-block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
            <div className="rounded-full bg-white px-4 py-1 text-sm font-medium text-purple-700">
              Company Culture Explorer
            </div>
          </div>
          <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            Culture Codes
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            世界的企業のCulture Codesを学ぼう<br />
            <Link
              href="https://forms.gle/2oU4CFRtw8DezFfg7"
              target="_blank" // 新しいタブで開く
              rel="noopener noreferrer" // セキュリティ対策
              className="text-blue-600 hover:underline" // 見た目を少し調整（任意）
            >
              あなたの好きな Culture Codeを教えて下さい
            </Link>
          </p>
        </header>

        <CultureCodeList />
      </div>
    </main>
  )
}
