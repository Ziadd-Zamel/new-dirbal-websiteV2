import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import AccessibilityWrapper from "@/components/accessibility-wrapper";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import Script from "next/script";
import { generateGlobalMetadata } from "@/lib/metadata/data";
import { generateGlobalStructuredData } from "@/lib/Seo/data";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = generateGlobalMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalStructuredData = generateGlobalStructuredData();

  return (
    <html lang="ar" dir="rtl">
      <head>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
        {/* Global Structured Data */}
        <Script
          id="global-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalStructuredData),
          }}
        />
      </head>
      <body className={`${tajawal.variable} font-sans antialiased`}>
        <Providers>
          {children}
          {/* Accessibility Button - Left side, resets on every page navigation */}
          <AccessibilityWrapper />
          {/* Scroll to Top Button - Right side */}
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  );
}
