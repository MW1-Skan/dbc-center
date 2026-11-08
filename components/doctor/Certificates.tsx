import { useTranslations } from "next-intl";
import { profile } from "@/content/credentials";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

/** Placeholder cards for the scanned certificates; the "View certificates" buttons land here. */
export function Certificates() {
  const t = useTranslations("DoctorPage.certificates");
  return (
    <section id="certificates" className="scroll-mt-24 border-t border-line bg-cloud">
      <div className="container-x flex flex-col gap-10 section-y md:gap-12">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
          {profile.certificates.map((c, i) => (
            <Reveal
              key={c}
              as="figure"
              delay={i * 0.06}
              className="group lift flex flex-col overflow-hidden rounded-card-lg border border-line bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImagePlaceholder
                  zoom
                  label={t("placeholder")}
                  alt={t(`items.${c}`)}
                  className="h-full"
                />
              </div>
              <figcaption className="p-5 text-[15px] font-semibold text-navy-800">
                {t(`items.${c}`)}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
