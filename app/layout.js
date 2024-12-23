import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "MediaForge - Effortless Media Production",
  description:
    "MediaForge is a cutting-edge SaaS platform that enables creatives, marketers, and businesses to generate high-quality photos and videos effortlessly. Streamline your media production with state-of-the-art technology.",
  keywords: [
    "MediaForge",
    "media production",
    "photo generator",
    "video generator",
    "SaaS platform",
    "creative tools",
    "marketing tools",
    "high-quality media",
  ],
  author: "MediaForge Team",
  charset: "UTF-8",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
