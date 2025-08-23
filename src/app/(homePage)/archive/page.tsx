import { generateArchiveMetadata } from "@/lib/metadata/data";
import { generateArchiveStructuredData } from "@/lib/Seo/data";
import ArchiveClient from "./archive-client";
import Script from "next/script";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateArchiveMetadata();
}

export default function Archive() {
  const structuredData = generateArchiveStructuredData();

  return (
    <>
      {/* ✅ Structured data via next/script */}
      <Script
        id="archive-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ArchiveClient />
    </>
  );
}
