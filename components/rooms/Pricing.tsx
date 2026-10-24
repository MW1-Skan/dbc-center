import { useTranslations } from "next-intl";
import { pricingTiers } from "@/content/rooms";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Pricing() {
  const t = useTranslations("RoomsPage.pricing");
  return (
    <section className="bg-white">
      <div className="container-x flex flex-col gap-8 section-y md:gap-12">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-stretch gap-5">
          {pricingTiers.map((tier, i) => {
            const featured = tier === "monthly";
            return (
              <Reveal
                key={tier}
                delay={i * 0.07}
                className={cn(
                  "lift relative flex flex-col gap-4 rounded-[26px] p-7 md:p-[34px]",
                  featured ? "bg-navy-800 text-white" : "border border-line-card bg-white",
                )}
              >
                {featured ? (
                  <span className="absolute end-6 top-6 rounded-pill bg-teal-200 px-3 py-[5px] text-[13px] font-bold text-navy-800">
                    {t("badge")}
                  </span>
                ) : null}
                <h3 className={cn("text-[21px]", featured && "text-white")}>
                  {t(`tiers.${tier}.title`)}
                </h3>
                <p className={cn("text-base", featured ? "text-on-navy-muted" : "text-muted")}>
                  {t(`tiers.${tier}.desc`)}
                </p>
                <div className="mt-auto flex items-baseline gap-2">
                  <strong
                    className={cn(
                      "font-heading text-[34px] font-bold",
                      !featured && "text-navy-800",
                    )}
                  >
                    {t(`tiers.${tier}.price`)}
                  </strong>
                  <span className={featured ? "text-on-navy-muted" : "text-muted"}>
                    {t(`tiers.${tier}.unit`)}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
