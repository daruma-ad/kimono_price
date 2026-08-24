import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "きもの相場ナビ | 写真でわかる着物の相場",
  description: "写真と特徴から、着物の売却相場と類似成約例を確認できます。",
  openGraph: {
    title: "きもの相場ナビ | 写真でわかる、着物の相場",
    description: "写真と特徴から、着物の売却相場と類似成約例を確認できます。",
    images: [{ url: "https://kimono-market-navi.nhk2.chatgpt.site/og.png", width: 1792, height: 1024, alt: "きもの相場ナビ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "きもの相場ナビ | 写真でわかる、着物の相場",
    description: "写真と特徴から、着物の売却相場と類似成約例を確認できます。",
    images: ["https://kimono-market-navi.nhk2.chatgpt.site/og.png"],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ja"><body>{children}</body></html>; }
