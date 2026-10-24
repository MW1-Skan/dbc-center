import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/icons";

/** Teal closing band before the footer on the home page. */
export function FinalCta() {
  const t = useTranslations("FinalCta");
  return (
    <section className="bg-white px-3 pb-14 md:px-6 lg:pb-24">
      <Reveal className="relative mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-7 overflow-hidden rounded-panel-lg bg-teal-500 px-6 py-11 text-white md:px-[72px] md:py-20">
        <div
          aria-hidden
          className="absolute -end-[140px] -top-[260px] size-[520px] rounded-full border-2 border-white/22"
        />
        <div className="relative flex max-w-[640px] flex-col gap-3">
          <h2 className="text-section text-white">{t("title")}</h2>
          <p className="text-lg text-white/92">{t("lead")}</p>
        </div>
        <Button
          href="/book"
          variant="white"
          className="relative h-[58px] shrink-0 px-[30px] max-md:w-full"
        >
          {t("cta")}
          <ArrowIcon size={18} className="nudge" />
        </Button>
      </Reveal>
    </section>
  );
}
