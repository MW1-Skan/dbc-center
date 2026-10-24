import { useTranslations } from "next-intl";
import { departmentIds } from "@/content/departments";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function Departments() {
  const t = useTranslations("Departments");
  return (
    <section id="team" className="scroll-mt-24 bg-mint">
      <div className="container-x grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-start gap-[18px] section-y md:gap-16">
        <Reveal className="flex flex-col gap-[18px] md:gap-5">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-section">{t("title")}</h2>
          <p className="hidden text-lead md:block">{t("lead")}</p>
          <ImagePlaceholder
            tone="mint"
            label={t("photoLabel")}
            alt={t("photoAlt")}
            className="mt-4 h-[300px] rounded-card-lg max-md:hidden"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <ol className="flex flex-col">
            {departmentIds.map((id, i) => (
              <li
                key={id}
                className="flex gap-4 border-b border-line-mint py-3.5 last:border-b-0 md:gap-6 md:py-[22px]"
              >
                <span className="min-w-[22px] font-heading text-sm font-semibold text-teal-600 md:min-w-7 md:pt-[3px] md:text-[15px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-sans text-base font-semibold tracking-normal md:font-heading md:text-xl">
                    {t(`items.${id}.name`)}
                  </h3>
                  <p className="hidden text-base text-muted md:block">{t(`items.${id}.desc`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
