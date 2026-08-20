import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "きもの相場ナビ | 写真でわかる着物の相場", description: "写真と特徴から、着物の売却相場と類似成約例を確認できます。" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ja"><body>{children}</body></html>; }
