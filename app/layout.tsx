import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rendering Patterns",
  description: "CSR・SSR・SSG などのレンダリング方式を Next.js 16 で比べるサンプル",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja">
      <body>
        <nav>
          <Link href="/">トップ</Link>
          <Link href="/csr">CSR</Link>
          <Link href="/ssr">SSR</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
