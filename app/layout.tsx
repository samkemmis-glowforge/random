import type { Metadata } from "next";
import { BASE } from "@/lib/base";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magic Engraver — Your photo, on anything. Just like that. | Glowforge Premium",
  description:
    "Magic Engraver turns any photo into a laser-ready engraving — traced, fitted, and tuned for any laser. Try it free with your own image.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&family=Exo+2:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-paper text-ink font-sans"
        style={
          {
            "--img-squiggle": `url(${BASE}/assets/mark-underline-squiggle-teal.png)`,
            "--img-burst": `url(${BASE}/assets/mark-burst-teal.png)`,
            "--img-coaster": `url(${BASE}/assets/milo-coaster-src.png)`,
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
