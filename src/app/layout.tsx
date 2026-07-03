import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://azadstudio.in"),
  title: {
    default: "AZAD STUDIO — Where CNC Meets Creativity",
    template: "%s | AZAD STUDIO",
  },
  description:
    "AZAD STUDIO offers premium CNC grayscale height maps, ArtCAM design, 3D relief design, event decoration, laser cutting, and custom design services. Precision craftsmanship meets creative excellence.",
  keywords: [
    "CNC design",
    "grayscale height map",
    "ArtCAM design",
    "3D relief design",
    "laser cutting",
    "event decoration",
    "custom CNC",
    "AZAD STUDIO",
    "CNC router design",
    "wood carving design",
  ],
  authors: [{ name: "Azad", url: "https://azadstudio.in" }],
  creator: "Azad",
  publisher: "AZAD STUDIO",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://azadstudio.in",
    siteName: "AZAD STUDIO",
    title: "AZAD STUDIO — Where CNC Meets Creativity",
    description:
      "Premium CNC design studio offering grayscale height maps, ArtCAM design, 3D relief, event decoration, and laser cutting services.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AZAD STUDIO — Premium CNC Design Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AZAD STUDIO — Where CNC Meets Creativity",
    description: "Premium CNC design studio offering exceptional craftsmanship.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://azadstudio.in",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#050505" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "AZAD STUDIO",
              description:
                "Premium CNC design studio offering grayscale height maps, ArtCAM design, 3D relief design, event decoration, laser cutting, and custom design services.",
              telephone: "+91-8958902932",
              email: "azadsaifi864@gmail.com",
              sameAs: ["https://www.instagram.com/mr_azad_saif"],
              priceRange: "₹₹",
              openingHours: "Mo-Sa 09:00-20:00",
              currenciesAccepted: "INR",
              paymentAccepted: "Cash, Online Transfer, UPI",
            }),
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#050505", color: "#fff" }}>
        {children}
      </body>
    </html>
  );
}
