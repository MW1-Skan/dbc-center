"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export const BMI_DEFAULTS = { height: 170, weight: 118 } as const;
export const BMI_RANGE = { height: [140, 210], weight: [50, 250] } as const;

type Category = "healthy" | "overweight" | "obesity1" | "obesity2" | "obesity3";

export function categorize(bmi: number): Category {
  if (bmi < 25) return "healthy";
  if (bmi < 30) return "overweight";
  if (bmi < 35) return "obesity1";
  if (bmi < 40) return "obesity2";
  return "obesity3";
}

const chip: Record<Category, string> = {
  healthy: "bg-chip text-teal-700",
  overweight: "bg-[#E6EFF8] text-[#1F5592]",
  obesity1: "bg-[#DCE8F4] text-[#1F5592]",
  obesity2: "bg-navy-700 text-white",
  obesity3: "bg-navy-900 text-white",
};

/** Height and weight sliders with a live BMI, category and guidance. */
export function BmiCalculator() {
  const t = useTranslations("Bmi");
  const id = useId();
  const [height, setHeight] = useState<number>(BMI_DEFAULTS.height);
  const [weight, setWeight] = useState<number>(BMI_DEFAULTS.weight);

  const bmi = weight / (height / 100) ** 2;
  const category = categorize(bmi);
  const message = bmi < 27 ? "low" : bmi < 35 ? "mid" : "high";
  const position = Math.max(0, Math.min(100, ((bmi - 18) / 32) * 100));
  const bookHref = `/book?height=${height}&weight=${weight}`;

  const slider = "h-7 w-full cursor-pointer accent-navy-700";

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-center gap-9 md:gap-[72px]">
      <div className="flex flex-col gap-[18px]">
        <span className="eyebrow text-teal-700">{t("eyebrow")}</span>
        <h2 className="text-section">{t("title")}</h2>
        <p className="text-lead">{t("lead")}</p>
        <div className="mt-2.5 flex flex-col gap-[22px]">
          <label htmlFor={`${id}-h`} className="flex flex-col gap-2.5">
            <span className="flex justify-between font-semibold text-navy-800">
              <span>{t("height")}</span>
              <span className="tabular-nums">{t("heightValue", { value: height })}</span>
            </span>
            <input
              id={`${id}-h`}
              type="range"
              min={BMI_RANGE.height[0]}
              max={BMI_RANGE.height[1]}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className={slider}
            />
          </label>
          <label htmlFor={`${id}-w`} className="flex flex-col gap-2.5">
            <span className="flex justify-between font-semibold text-navy-800">
              <span>{t("weight")}</span>
              <span className="tabular-nums">{t("weightValue", { value: weight })}</span>
            </span>
            <input
              id={`${id}-w`}
              type="range"
              min={BMI_RANGE.weight[0]}
              max={BMI_RANGE.weight[1]}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className={slider}
            />
          </label>
        </div>
      </div>

      <div
        className="flex flex-col gap-5 overflow-hidden rounded-panel bg-white p-7 shadow-panel md:p-11"
        aria-live="polite"
      >
        <span className="text-[15px] font-semibold text-muted">{t("your")}</span>
        <div className="flex flex-wrap items-baseline gap-4">
          <span
            className="font-heading text-[64px] leading-[.9] font-semibold text-navy-800 tabular-nums md:text-[84px]"
            data-testid="bmi-value"
          >
            {bmi.toFixed(1)}
          </span>
          <span
            className={cn(
              "duration-fast rounded-pill px-3.5 py-1.5 text-[15px] font-semibold transition-colors",
              chip[category],
            )}
            data-testid="bmi-category"
          >
            {t(`categories.${category}`)}
          </span>
        </div>
        <div
          dir="ltr"
          role="img"
          aria-label={t("scaleLabel")}
          className="my-1 flex flex-col gap-1.5"
        >
          <div className="relative h-2.5 rounded-pill bg-[linear-gradient(90deg,#8FD3D8_0%,#8FD3D8_21%,#7FB3D9_21%,#7FB3D9_37%,#3E7BB8_37%,#3E7BB8_53%,#1F5592_53%,#1F5592_69%,#0B3A6A_69%)]">
            <div
              className="duration-fast absolute inset-0 transition-transform ease-out"
              style={{ transform: `translateX(${position}%)` }}
            >
              <span className="absolute top-1/2 left-0 size-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-navy-700 bg-white shadow-[0_2px_6px_rgba(0,0,0,.2)]" />
            </div>
          </div>
          <div className="flex justify-between font-mono text-xs text-muted">
            {[18, 25, 30, 35, 40, 50].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
        <p className="font-medium text-body">{t(`messages.${message}`)}</p>
        <Button href={bookHref} className="h-[52px] w-full" data-testid="bmi-cta">
          {t("cta")}
          <ArrowIcon size={18} className="nudge" />
        </Button>
        <span className="text-[13px] text-muted">{t("note")}</span>
      </div>
    </div>
  );
}
