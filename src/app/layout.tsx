import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Outfit } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gerry Albert Buala — Software Developer",
  description:
    "Software developer from the Philippines specializing in Flutter, Android, and modern backend solutions.",
  openGraph: {
    title: "Gerry Albert Buala — Software Developer",
    description:
      "Building seamless digital experiences with Flutter and modern backends.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${bricolage.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="min-h-full h-full overflow-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
