import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Reunión - Community Center & Social Services",
  description: "La Reunión is a community center providing food assistance, after-school programs, resource connections, and community activities with dignity and care.",
  keywords: ["community center", "social services", "food pantry", "after-school program", "volunteer", "donate"],
  icons: {
    icon: '/la-reunion-favicon.png',
    shortcut: '/la-reunion-favicon.png',
    apple: '/la-reunion-favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/la-reunion-favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/la-reunion-favicon.png" />
        <link rel="apple-touch-icon" href="/la-reunion-favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
