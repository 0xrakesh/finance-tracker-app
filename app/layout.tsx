import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {Toaster} from "@/components/ui/sonner";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Finance Tracking App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <UserProvider>
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center p-24">
          {children}
        </main>
        <Toaster/>
      </body>
    </UserProvider>
    </html>
  );
}
