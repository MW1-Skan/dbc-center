import { useTranslations } from "next-intl";
import { contact } from "@/content/contact";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

/** "Travelling from the Gulf or abroad?" band with a WhatsApp CTA. */
export function AbroadBand() {
  const t = useTranslations("Abroad");
  return (
    <section className="bg-white px-3 pb-14 md:px-6 lg:pb-28">
      <Reveal className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-7 rounded-panel-lg bg-navy-900 px-6 py-10 text-white md:px-[72px] md:py-16">
        <div className="flex max-w-[680px] flex-col gap-3">
          <h2 className="text-band text-white">{t("title")}</h2>
          <p className="text-on-navy-muted">{t("lead")}</p>
        </div>
        <Button
          href={contact.whatsappHref}
          className="h-14 shrink-0 bg-teal-500 px-7 text-white hover:bg-teal-600 hover:text-white max-md:w-full"
        >
          <WhatsAppIcon size={18} />
          {t("cta")}
        </Button>
      </Reveal>
    </section>
  );
}
