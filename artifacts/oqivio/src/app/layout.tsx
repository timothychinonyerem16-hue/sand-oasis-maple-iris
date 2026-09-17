import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OQIVIO — Your Campus. One Place.",
  description:
    "Navigate, discover and connect on campus. University of Nigeria, Nsukka digital companion.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="bg-slate-50 text-navy-900 antialiased">
        {children}
      </body>
    </html>
  );
}
