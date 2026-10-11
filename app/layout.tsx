import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Josefin_Sans, Jost } from "next/font/google";
import { invitation } from "@/invitation.config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["400", "500"] });
// The name: thin, wide geometric capitals, modern and minimal against the classic serif text.
const nameFont = Josefin_Sans({ variable: "--font-josefin", subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: `${invitation.name} · Baptism`,
  description: `${invitation.heading}. ${invitation.message}`,
};

export const viewport: Viewport = {
  themeColor: "#f3ece0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${nameFont.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
