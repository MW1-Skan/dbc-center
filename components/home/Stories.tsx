import { useTranslations } from "next-intl";
import { stories, storiesIndexHref } from "@/content/stories";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { TextLink } from "@/components/ui/TextLink";
import { PlayIcon } from "@/components/ui/icons";

export function Stories() {
  const t = useTranslations("Stories");
  return (
    <section id="stories" className="scroll-mt-24 border-t border-line bg-cloud">
      <div className="container-x flex flex-col gap-[22px] section-y md:gap-12">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          aside={
            <TextLink href={storiesIndexHref} arrow className="max-md:hidden">
              {t("seeAll")}
            </TextLink>
          }
        />
        <div className="-me-5 scrollbar-none flex snap-x gap-3.5 overflow-x-auto pe-5 md:me-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] md:gap-6 md:overflow-visible md:pe-0">
          {stories.map((s, i) => (
            <Reveal
              key={s.id}
              as="figure"
              delay={i * 0.07}
              className="group lift flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border border-line bg-white md:w-auto md:shrink md:rounded-card-lg"
            >
              <div className="h-[170px] overflow-hidden md:h-[220px]">
                <ImagePlaceholder zoom alt={t("videoAlt")} className="h-full">
                  <span className="flex size-14 items-center justify-center rounded-full bg-navy-700 text-white md:size-16">
                    <PlayIcon size={22} />
                  </span>
                </ImagePlaceholder>
              </div>
              <div className="flex flex-col gap-3 p-5 md:gap-4 md:p-[26px]">
                <blockquote className="font-heading text-[17px] leading-[1.45] font-medium text-navy-800 md:text-[19px]">
                  <span className="md:hidden">{t("quoteShort")}</span>
                  <span className="hidden md:inline">{t("quote")}</span>
                </blockquote>
                <figcaption className="text-sm text-muted md:text-[15px]">
                  <strong className="font-bold text-body">{t("name")}</strong> ·{" "}
                  <span className="md:hidden">{t("captionShort")}</span>
                  <span className="hidden md:inline">{t("caption")}</span>
                </figcaption>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
