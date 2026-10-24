import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { procedures } from "@/content/procedures";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Tag } from "@/components/ui/Tag";
import { ArrowIcon, ChevronIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function Procedures() {
  const t = useTranslations("Procedures");

  return (
    <section id="procedures" className="scroll-mt-24 bg-white">
      <div className="container-x flex flex-col gap-[22px] section-y md:gap-14">
        <SectionHeader
          eyebrow={t("eyebrow")}
          maxWidth="max-w-[680px]"
          title={
            <>
              <span className="md:hidden">{t("titleShort")}</span>
              <span className="hidden md:inline">{t("title")}</span>
            </>
          }
          aside={<p className="hidden max-w-[420px] text-muted md:block">{t("aside")}</p>}
        />

        {/* Desktop and tablet: cards */}
        <div className="hidden grid-cols-[repeat(auto-fit,minmax(min(270px,100%),1fr))] gap-6 md:grid">
          {procedures.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07} className="flex">
              <Link
                href={p.href}
                className="group lift flex w-full flex-col overflow-hidden rounded-card-lg border border-line bg-white text-body no-underline hover:text-body"
              >
                <div className="h-[190px] overflow-hidden">
                  <ImagePlaceholder
                    zoom
                    label={t("illustration")}
                    alt={t("illustrationAlt")}
                    className="h-full"
                  />
                </div>
                <div className="flex grow flex-col gap-3 p-[26px]">
                  <Tag tone={p.kind === "nonSurgical" ? "warm" : "teal"} className="self-start">
                    {t(`kinds.${p.kind}`)}
                  </Tag>
                  <h3 className="text-[22px]">{t(`items.${p.id}.name`)}</h3>
                  <p className="grow text-base text-muted">{t(`items.${p.id}.desc`)}</p>
                  <span className="border-t border-line-faint pt-3.5 text-sm text-muted">
                    {t(`items.${p.id}.meta`)}
                  </span>
                  <span className="flex items-center gap-2 font-semibold text-navy-700">
                    {t("learnMore")}
                    <ArrowIcon size={16} className="nudge" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Phones: compact rows */}
        <div className="flex flex-col gap-3 md:hidden">
          {procedures.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <Link
                href={p.href}
                className="group lift flex items-center gap-4 rounded-card border border-line bg-white p-[18px] text-body no-underline hover:text-body"
              >
                <div className="flex flex-1 flex-col gap-1">
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      p.kind === "nonSurgical" ? "text-warm-text" : "text-teal-700",
                    )}
                  >
                    {t(`kinds.${p.kind}`)}
                  </span>
                  <h3 className="text-lg">{t(`items.${p.id}.name`)}</h3>
                  <p className="text-[15px] leading-[1.45] text-muted">
                    {t(`items.${p.id}.descShort`)}
                  </p>
                </div>
                <ChevronIcon size={20} className="nudge shrink-0 text-navy-700" />
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="hidden md:block">
          <p className="text-center text-muted">
            {t("notSure")}{" "}
            <Link href="/book" className="link-grow font-semibold">
              {t("notSureCta")}
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
