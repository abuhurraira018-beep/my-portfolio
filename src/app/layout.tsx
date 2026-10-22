import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { AuthProvider } from "@/context/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BootstrapClient } from "@/components/layout/BootstrapClient";
import { ToastContainer } from "@/components/layout/ToastContainer";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Business & Commerce Solutions`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Discover enterprise-grade workplace hardware, acoustic systems, and commercial accessories. Engineered for productivity, performance, and durability.",
  keywords: [
    "commercial hardware",
    "business products",
    "office technology",
    "ergonomic furniture",
    "executive audio",
    "Nexora commerce",
  ],
  authors: [{ name: "NEXORA Enterprise" }],
  openGraph: {
    title: `${siteConfig.name} — Business & Commerce Solutions`,
    description: "Discover enterprise-grade workplace hardware, acoustic systems, and commercial accessories.",
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
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
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body>
        <ShopProvider>
          <AuthProvider>
            <BootstrapClient />
            <AnnouncementBar />
            <Navbar />
            <AuthGuard>
              <main>{children}</main>
            </AuthGuard>
            <Footer />
            <ToastContainer />
          </AuthProvider>
        </ShopProvider>
      </body>
    </html>
  );
}

