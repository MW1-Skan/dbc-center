import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { articles, articlesIndexHref } from "@/content/articles";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { TextLink } from "@/components/ui/TextLink";

/** Desktop-only section: the mobile design ends with the rooms band. */
export function Advice() {
  const t = useTranslations("Advice");
  return (
    <section id="advice" className="hidden scroll-mt-24 bg-white md:block">
      <div className="container-x flex flex-col gap-12 section-y">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          aside={
            <TextLink href={articlesIndexHref} arrow>
              {t("all")}
            </TextLink>
          }
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-8">
          {articles.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.07}>
              <Link
                href={a.href}
                className="group lift flex flex-col gap-[18px] rounded-card text-body no-underline hover:text-body"
              >
                <div className="h-[220px] overflow-hidden rounded-card">
                  <ImagePlaceholder zoom alt={t("imageAlt")} className="h-full" />
                </div>
                <span className="text-sm text-muted">
                  {t(`categories.${a.category}`)} · {t("date")}
                </span>
                <h3 className="text-[21px] leading-[1.3]">{t(`items.${a.id}`)}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
