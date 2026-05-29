import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./components/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenView CRM | Zimbra",
  description: "Sistema de captación, tracking y ventas automatizado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full text-zinc-950 relative overflow-x-hidden">
        
        {/* Fondo con degradado profesional */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-zinc-50/50 to-zinc-100/40" />
        
        {/* Patrón sutil de puntos */}
        <div 
          className="fixed inset-0 -z-10 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle, #18181b 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Manchas decorativas (blobs) */}
        <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-50/40 to-transparent blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="fixed bottom-0 left-0 -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emerald-50/30 to-transparent blur-3xl translate-y-1/2 -translate-x-1/4" />

        <Sidebar />
        <main className="pl-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}