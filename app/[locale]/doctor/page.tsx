import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata, clinicJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { FooterSlim } from "@/components/layout/Footer";
import { ProfileIntro } from "@/components/doctor/ProfileIntro";
import { ProfileResearch } from "@/components/doctor/ProfileResearch";
import { ProfileRecognition } from "@/components/doctor/ProfileRecognition";
import { Certificates } from "@/components/doctor/Certificates";
import { FinalCta } from "@/components/home/FinalCta";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/doctor">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(
    hasLocale(routing.locales, locale) ? locale : routing.defaultLocale,
    "doctor",
  );
}

export default async function DoctorPage({ params }: PageProps<"/[locale]/doctor">) {
  const locale = await resolveLocale(params);
  return (
    <>
      <JsonLd data={clinicJsonLd(locale)} />
      <main id="main" className="flex-1">
        <ProfileIntro />
        <ProfileResearch />
        <ProfileRecognition />
        <Certificates />
        <FinalCta />
      </main>
      <FooterSlim legal="medical" />
    </>
  );
}
