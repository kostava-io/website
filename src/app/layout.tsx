import "@/app/globals.css";
import type { Metadata } from "next";

import { Header } from "@/components/header";
import { Kanit } from "next/font/google";
import { getMessages, getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/providers/theme-provider";
import localFont from "next/font/local";

const kanit = Kanit({
  subsets: ["latin"], // Specify the subsets you need
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const firaGo = localFont({
  src: [
    {
      path: "./fonts/FiraGo-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/FiraGo-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/FiraGo-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/FiraGo-800.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});
const URL = "https://kostava.io";

export const metadata: Metadata = {
  title: {
    default: "KOSTAVA",
    template: "%s | Personal website.",
  },
  icons: [
    {
      rel: "icon",
      href: "/favicon.ico",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
      url: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
      url: "/site.webmanifest",
    },
  ],
  description:
    "ძმანო და დანო, საქართველოს ისტორიაში ყოფილა დიდებული წამები და ეს წამი, არის ერთ-ერთი უდიდებულესი!",
  openGraph: {
    title: "KOSTAVA",
    description:
      "ძმანო და დანო, საქართველოს ისტორიაში ყოფილა დიდებული წამები და ეს წამი, არის ერთ-ერთი უდიდებულესი!",
    url: URL,
    siteName: "KOSTAVA",
    locale: "ka_GE",
    type: "website",
    images: [
      {
        url: `${URL}/og.png`,
        width: 1920,
        height: 1080,
        alt: "Kostava OG image",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <html lang={locale}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <body
            className={`flex flex-col h-screen ${locale === "en" ? kanit.className : firaGo.className}`}
          >
            <Header />
            <main className="flex-1 flex overflow-hidden">{children}</main>
          </body>
        </ThemeProvider>
      </html>
    </NextIntlClientProvider>
  );
}

export const runtime = "edge";
