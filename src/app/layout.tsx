import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mind Atlas — The psychology of everyday life",
  description:
    "An educational, interactive 3D brain. Explore the psychology of memory, attention, and emotion — and the brain areas that support them — with sources for every claim.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#dde5ea",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
