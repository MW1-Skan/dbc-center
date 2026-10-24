import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { contact, siteUrl } from "@/content/contact";

type Page = "home" | "book" | "rooms";
const paths: Record<Page, string> = { home: "", book: "/book", rooms: "/rooms" };

export async function buildMetadata(locale: Locale, page: Page): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  const path = paths[page];
  const url = `${siteUrl}/${locale}${path}`;
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}${path}`]));

  return {
    title: t(`${page}.title`),
    description: t(`${page}.description`),
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": `${siteUrl}/${routing.defaultLocale}${path}` },
    },
    openGraph: {
      type: "website",
      url,
      siteName: t("siteName"),
      title: t(`${page}.title`),
      description: t(`${page}.description`),
      locale: locale === "ar" ? "ar_EG" : "en_GB",
      alternateLocale: locale === "ar" ? "en_GB" : "ar_EG",
    },
    twitter: { card: "summary_large_image" },
  };
}

export function clinicJsonLd(locale: Locale) {
  const clinicId = `${siteUrl}/#clinic`;
  const physicianId = `${siteUrl}/#physician`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "@id": clinicId,
      name: contact.name,
      url: `${siteUrl}/${locale}`,
      telephone: contact.phoneDisplay.replace(/\s/g, ""),
      email: contact.email,
      medicalSpecialty: "Bariatric surgery",
      address: {
        "@type": "PostalAddress",
        streetAddress: `${contact.address.line1}, ${contact.address.line2}`,
        addressLocality: contact.address.city,
        addressCountry: contact.geo.country,
      },
      sameAs: contact.social.filter((s) => s.href !== "#").map((s) => s.href),
      employee: { "@id": physicianId },
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "@id": physicianId,
      name: "Dr. Mohsen Karam",
      medicalSpecialty: "Bariatric surgery",
      worksFor: { "@id": clinicId },
      url: `${siteUrl}/${locale}#doctor`,
    },
  ];
}
