import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { pickMessages } from "@/lib/utils";
import { FooterSlim } from "@/components/layout/Footer";
import { PageHero } from "@/components/booking/PageHero";
import { BookingForm } from "@/components/booking/BookingForm";
import { BookingAside } from "@/components/booking/BookingAside";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata({ params }: PageProps<"/[locale]/book">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(hasLocale(routing.locales, locale) ? locale : routing.defaultLocale, "book");
}

export default async function BookPage({ params }: PageProps<"/[locale]/book">) {
  await resolveLocale(params);
  const t = await getTranslations("BookPage");
  const messages = await getMessages();

  return (
    <>
      <main id="main" className="flex-1 bg-cloud">
        <PageHero crumb={t("crumb")} title={t("title")} lead={t("lead")} />
        <section>
          <div className="container-x flex flex-wrap items-start gap-8 pt-10 pb-20 md:pt-14 md:pb-28">
            <Reveal className="min-w-0 flex-[999_1_600px]">
              <NextIntlClientProvider
                messages={pickMessages(messages, ["BookPage", "Forms", "Common"])}
              >
                <BookingForm />
              </NextIntlClientProvider>
            </Reveal>
            <BookingAside />
          </div>
        </section>
      </main>
      <FooterSlim legal="medical" />
    </>
  );
}
