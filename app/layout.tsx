import type { Metadata } from "next";
import "./globals.css";
import { fontBody, fontHeading } from "@/lib/fonts";
import { Footer, Header } from "@/components/layout";

export const metadata: Metadata = {
  title: "Roast & Rest — Craft Coffee Experience",
  description:
    "Premium craft coffee shop with handpicked beans and artisan brewing methods. Visit us for an unforgettable coffee experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body className="min-h-full flex flex-col font-body antialiased">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
