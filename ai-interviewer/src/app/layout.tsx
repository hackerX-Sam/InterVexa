import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Intervexa – AI-Powered Interview Simulator",
  description:
    "Ace your next interview with real-time AI coaching, dynamic questions, performance analytics, and a built-in coding environment. Practice technical, behavioral, and coding interviews with confidence.",
  keywords: ["AI interview", "interview simulator", "technical interview", "coding interview", "job preparation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050814" />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
