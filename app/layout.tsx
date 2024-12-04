import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Luma Shop",
  description: "Luma Shop is an e-commerce of technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}