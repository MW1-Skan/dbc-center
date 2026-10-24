import type { Metadata, Viewport } from "next";
import { DM_Sans, IBM_Plex_Sans_Arabic, Sora } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { localeDirection, routing } from "@/i18n/routing";
import { siteUrl } from "@/content/contact";
import { pickMessages } from "@/lib/utils";
import { SkipLink } from "@/components/layout/SkipLink";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import "../globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: false,
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

export const viewport: Viewport = {
  themeColor: "#0A2E55",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const clientMessages = pickMessages(messages, ["Nav", "Common"]);

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      className={`${sora.variable} ${dmSans.variable} ${plexArabic.variable}`}
      // The inline script below adds data-js before hydration; only this element's attributes are exempt.
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS availability so scroll-reveal content is never hidden without it. */}
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.dataset.js='1'"}
        </Script>
      </head>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider messages={clientMessages}>
          <SkipLink />
          <TopBar />
          <Header />
          {children}
          <StickyActionBar />
          <WhatsAppFab />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
