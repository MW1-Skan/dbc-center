import type { Metadata } from "next";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata, clinicJsonLd } from "@/lib/seo";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Procedures } from "@/components/home/Procedures";
import { Departments } from "@/components/home/Departments";
import { Doctor } from "@/components/home/Doctor";
import { Stories } from "@/components/home/Stories";
import { CallbackBand } from "@/components/home/CallbackBand";
import { RoomsBand } from "@/components/home/RoomsBand";
import { Advice } from "@/components/home/Advice";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(hasLocale(routing.locales, locale) ? locale : routing.defaultLocale, "home");
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  return (
    <>
      <JsonLd data={clinicJsonLd(locale)} />
      <main id="main" className="flex-1">
        <Hero />
        <TrustStrip />
        <Procedures />
        <Departments />
        <Doctor />
        <Stories />
        <CallbackBand />
        <RoomsBand />
        <Advice />
      </main>
      <Footer />
    </>
  );
}
