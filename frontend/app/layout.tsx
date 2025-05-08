import { Metadata } from "next";
import "./globals.css";

import { Toaster } from "react-hot-toast";

import Header from "./Header";
import Footer from "./Footer";

export const metadata: Metadata = {
  title: "All Stars Helsinki",
  description: "The the Love of the Game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-gray-50 text-gray-900 font-sans flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        <Header />
        <Toaster position="top-right" reverseOrder={false} />
        <main className="flex-1 w-12/12 max-w-7xl mt-30 mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
