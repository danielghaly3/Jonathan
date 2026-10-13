import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Yellowtail } from "next/font/google";
import { invitation } from "@/invitation.config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["400", "500"] });
// The name: a bold, slanted brush script (client reference: a heavy connected brush hand).
const nameFont = Yellowtail({ variable: "--font-yellowtail", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://jonathan-baptism.vercel.app"), // absolute link-preview URLs for WhatsApp/iMessage
  title: `${invitation.name} · Baptism`,
  description: `${invitation.heading}. ${invitation.message}`,
  openGraph: { title: `You are invited to ${invitation.name}'s baptism`, description: invitation.message, type: "website" },
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
