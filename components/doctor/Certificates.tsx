import { useTranslations } from "next-intl";
import { certificateItems } from "@/content/credentials";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CertificatesGrid, type CertificateCardItem } from "./CertificatesGrid";

/** Scanned diplomas, memberships, training certificates and awards with interactive lightbox. */
export function Certificates() {
  const t = useTranslations("DoctorPage.certificates");
  const items: CertificateCardItem[] = certificateItems.map((c, i) => ({
    id: c.id,
    src: c.src,
    caption: t(`items.${c.id}`),
    counter: t("counter", { current: i + 1, total: certificateItems.length }),
  }));

  return (
    <section id="certificates" className="scroll-mt-24 border-t border-line bg-cloud">
      <div className="container-x flex flex-col gap-10 section-y md:gap-12">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
        <CertificatesGrid
          items={items}
          labels={{
            zoomHint: t("zoomHint"),
            close: t("close"),
            previous: t("previous"),
            next: t("next"),
          }}
        />
      </div>
    </section>
  );
}
