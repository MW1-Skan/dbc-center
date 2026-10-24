import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { pickMessages } from "@/lib/utils";
import { FooterSlim } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RoomsHero } from "@/components/rooms/RoomsHero";
import { RoomSelectionProvider } from "@/components/rooms/RoomSelection";
import { FloorPlan, RoomCards } from "@/components/rooms/RoomsPicker";
import { Included } from "@/components/rooms/Included";
import { Pricing } from "@/components/rooms/Pricing";
import { SelectionSummary } from "@/components/rooms/SelectionSummary";
import { InquiryForm } from "@/components/rooms/InquiryForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/rooms">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(
    hasLocale(routing.locales, locale) ? locale : routing.defaultLocale,
    "rooms",
  );
}

export default async function RoomsPage({ params }: PageProps<"/[locale]/rooms">) {
  await resolveLocale(params);
  const t = await getTranslations("RoomsPage");
  const messages = await getMessages();

  return (
    <>
      <main id="main" className="flex-1">
        <RoomsHero />
        <NextIntlClientProvider messages={pickMessages(messages, ["RoomsPage", "Forms", "Common"])}>
          <RoomSelectionProvider>
            <section id="rooms" className="scroll-mt-24 bg-white">
              <div className="container-x flex flex-col gap-8 section-y md:gap-11">
                <SectionHeader
                  eyebrow={t("rooms.eyebrow")}
                  title={t("rooms.title")}
                  aside={<p className="max-w-[420px] text-muted">{t("rooms.aside")}</p>}
                />
                <Reveal>
                  <FloorPlan />
                </Reveal>
                <Reveal delay={0.08}>
                  <RoomCards />
                </Reveal>
              </div>
            </section>

            <Included />
            <Pricing />

            <section id="inquiry" className="scroll-mt-24 border-t border-line bg-cloud">
              <div className="container-x flex flex-wrap items-start gap-8 section-y">
                <Reveal className="flex min-w-0 flex-[1_1_340px] flex-col gap-[22px]">
                  <Eyebrow>{t("inquiry.eyebrow")}</Eyebrow>
                  <h2 className="text-section-sm">{t("inquiry.title")}</h2>
                  <p className="text-lead">{t("inquiry.lead")}</p>
                  <SelectionSummary />
                </Reveal>
                <Reveal delay={0.08} className="min-w-0 flex-[999_1_600px]">
                  <InquiryForm />
                </Reveal>
              </div>
            </section>
          </RoomSelectionProvider>
        </NextIntlClientProvider>
      </main>
      <FooterSlim legal="rental" />
    </>
  );
}
