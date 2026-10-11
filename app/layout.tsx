import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Della_Respira, Jost } from "next/font/google";
import { invitation } from "@/invitation.config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["400", "500"] });
// The name: a Renaissance book face, as in old church and liturgical printing.
const nameFont = Della_Respira({ variable: "--font-della", subsets: ["latin"], weight: "400" });

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
