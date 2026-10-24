import { useTranslations } from "next-intl";
import { contact } from "@/content/contact";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/** Closing "Interested in a room?" band on the rooms page. */
export function RoomsCta() {
  const t = useTranslations("RoomsPage.closing");
  return (
    <section className="bg-cloud px-3 pb-14 md:px-6 lg:pb-24">
      <Reveal className="relative mx-auto flex max-w-[1240px] flex-col gap-4 overflow-hidden rounded-panel-lg bg-navy-800 px-6 py-10 text-white md:px-[72px] md:py-16">
        <div
          aria-hidden
          className="absolute -end-[120px] -bottom-[180px] size-[360px] rounded-full border-2 border-teal-200/20"
        />
        <h2 className="relative text-band text-white">{t("title")}</h2>
        <p className="relative max-w-[640px] text-on-navy-muted">{t("lead")}</p>
        <div className="relative mt-2 flex flex-wrap gap-2.5">
          <Button
            href={contact.phoneHref}
            variant="white"
            className="h-[52px] px-[22px] max-md:w-full"
          >
            {t("call")}
          </Button>
          <Button
            href={contact.whatsappHref}
            className="h-[52px] bg-teal-500 px-[22px] text-white hover:bg-teal-600 hover:text-white max-md:w-full"
          >
            {t("whatsapp")}
          </Button>
          <Button
            href={contact.emailHref}
            variant="ghost"
            className="h-[52px] px-[22px] max-md:w-full"
          >
            {t("email")}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
