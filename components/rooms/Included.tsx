import { useTranslations } from "next-intl";
import { includedFeatures } from "@/content/rooms";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  DeskIcon,
  PersonIcon,
  PinIcon,
  SofaIcon,
  SparkleIcon,
  WifiIcon,
} from "@/components/ui/icons";

const icons = {
  furnished: DeskIcon,
  reception: PersonIcon,
  waiting: SofaIcon,
  utilities: WifiIcon,
  cleaning: SparkleIcon,
  location: PinIcon,
} as const;

export function Included() {
  const t = useTranslations("RoomsPage.included");
  return (
    <section className="bg-mint">
      <div className="container-x flex flex-col gap-8 section-y md:gap-12">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[18px]">
          {includedFeatures.map((f, i) => {
            const Icon = icons[f];
            return (
              <Reveal
                key={f}
                delay={i * 0.06}
                className="flex flex-col gap-2.5 rounded-[22px] bg-white p-6 md:p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-input bg-chip">
                  <Icon size={22} className="text-teal-600" />
                </span>
                <h3 className="text-[19px]">{t(`items.${f}.title`)}</h3>
                <p className="text-base text-muted">{t(`items.${f}.desc`)}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
