import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { appConfig } from "@/config/app.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novasaas-v1.netlify.app"),
  title: {
    default: appConfig.fullName,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  applicationName: appConfig.name,
  keywords: [
    "Next.js admin dashboard",
    "SaaS dashboard",
    "TypeScript starter",
    "Tailwind CSS dashboard",
  ],
  authors: [{ name: "Vanessa Duarte" }],
  creator: "Vanessa Duarte",
  openGraph: {
    type: "website",
    siteName: appConfig.name,
    title: appConfig.fullName,
    description: appConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.fullName,
    description: appConfig.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
